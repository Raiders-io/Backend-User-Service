import type { FieldContext } from '@vinejs/vine/types'
import type { Database } from '@adonisjs/lucid/database'
import User from '#models/user'
import UserNotFoundException from '#exceptions/user_not_found_exception'
import type { MultipartFile } from '@adonisjs/core/types/bodyparser'
import drive from '@adonisjs/drive/services/main'
import sharp from 'sharp'

import {
  AvatarMetadataUnreadableException,
  AvatarResolutionTooHighException,
  AvatarResolutionTooLowException,
  AvatarUploadFailedException,
} from '#exceptions/avatar_exception'

import { AVATAR_CONSTRAINTS } from '#constants/avatar_constants'
import LessonCompleted from '#models/lesson_completion'

export async function isUsernameAvailable(db: Database, value: string, field: FieldContext) {
  const query = db.from('profiles').where('username', value)

  const currentUserId = field.meta.userId
  if (currentUserId) {
    query.whereNot('user_id', currentUserId)
  }

  const existing = await query.first()

  return !existing
}

export default class UserService {
  async create(id: string, payload: Partial<User>) {
    return User.create({ ...payload, id })
  }

  async findById(id: string) {
    const user = await User.find(id)
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }

  async update(id: string, payload: Partial<User> & { avatar?: MultipartFile }) {
    const user = await this.findById(id)
    const { avatar, ...rest } = payload

    if (avatar) {
      const metadata = await sharp(avatar.tmpPath).metadata()

      if (!metadata.width || !metadata.height) {
        throw new AvatarMetadataUnreadableException()
      }

      if (
        metadata.width < AVATAR_CONSTRAINTS.MIN_SIZE ||
        metadata.height < AVATAR_CONSTRAINTS.MIN_SIZE
      ) {
        throw new AvatarResolutionTooLowException(AVATAR_CONSTRAINTS.MIN_SIZE)
      }

      if (
        metadata.width > AVATAR_CONSTRAINTS.MAX_SIZE ||
        metadata.height > AVATAR_CONSTRAINTS.MAX_SIZE
      ) {
        throw new AvatarResolutionTooHighException(AVATAR_CONSTRAINTS.MAX_SIZE)
      }

      try {
        const resizedBuffer = await sharp(avatar.tmpPath)
          .resize(AVATAR_CONSTRAINTS.OUTPUT_SIZE, AVATAR_CONSTRAINTS.OUTPUT_SIZE, {
            fit: 'cover',
            position: 'center',
          })
          .webp({ quality: AVATAR_CONSTRAINTS.OUTPUT_QUALITY })
          .toBuffer()

        const key = `avatars/${user.id}-${Date.now()}.webp`
        await drive.use().put(key, resizedBuffer)
        user.avatarUrl = await drive.use().getUrl(key)
      } catch {
        throw new AvatarUploadFailedException()
      }
    }

    user.merge(rest)
    await user.save()
    return user
  }

  async delete(id: string) {
    const user = await this.findById(id)
    await user.delete()
  }

  async countCompletedLessons(userId: string) {
    const result = await LessonCompleted.query().where('user_id', userId).count('* as total')
    return Number(result[0].$extras.total)
  }

  async getMe(userId: string) {
    const [user, lessonsCompletedCount] = await Promise.all([
      this.findById(userId),
      this.countCompletedLessons(userId),
    ])

    return this.presentMe(user, lessonsCompletedCount)
  }

  async getPublicProfile(userId: string) {
    const user = await this.findById(userId)
    return this.presentPublicProfile(user)
  }

  private presentMe(user: User, lessonsCompletedCount: number) {
    return {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastActivityDate: user.lastActivityDate,
      lessonsCompletedCount,
    }
  }

  private presentPublicProfile(user: User) {
    return {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      currentStreak: user.currentStreak,
    }
  }

  async searchByUsername(query: string, page: number, limit: number) {
    const result = await User.query()
      .whereILike('username', `${query}%`)
      .orderBy('username', 'asc')
      .paginate(page, limit)

    return result.serialize({
      fields: ['id', 'username', 'firstname', 'lastname', 'avatar_url'],
    })
  }
}
