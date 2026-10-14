import User from '#models/user'
import drive from '@adonisjs/drive/services/main'
import sharp from 'sharp'

import {
  AvatarMetadataUnreadableException,
  AvatarResolutionTooHighException,
  AvatarResolutionTooLowException,
  AvatarUploadFailedException,
} from '#exceptions/avatar_exception'

import { AVATAR_CONSTRAINTS } from '#constants/avatar_constants'
import { generateUniqueTemporaryUsername } from '#services/utils_service'
import type { updateUserValidator } from '#validators/user'
import type { Infer } from '@vinejs/vine/types'
import type { Me, PublicUser } from '#constants/user_constants'
import eventPublisher from '#constants/events'

type UpdateUserPayload = Infer<typeof updateUserValidator>

export class UserService {
  async create(new_id: string) {
    const username = await generateUniqueTemporaryUsername(new_id)

    return User.create({
      id: new_id,
      username: username,
    })
  }

  async findById(id: string) {
    const user = await User.query().where('id', id).withCount('lesson_completions').first()

    if (!user) {
      return await this.create(id)
    }
    return user
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const user = await User.query()
      .where('username', username)
      .withCount('lesson_completions')
      .first()

    if (!user) {
      return null
    }

    return this.presentPublicProfile(user)
  }

  async update(id: string, payload: UpdateUserPayload) {
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

    await user.loadCount('lesson_completions')

    await eventPublisher.publish('data.updated', {
      user: this.presentPublicProfile(user),
    })

    if (rest.username) {
      await eventPublisher.publish('username.updated', {
        userId: user.id,
        username: user.username,
      })
    }

    return this.presentMe(user)
  }

  async delete(id: string) {
    const user = await this.findById(id)
    await user.delete()
  }

  async getMe(userId: string) {
    const user = await this.findById(userId)
    return this.presentMe(user)
  }

  async getPublicProfile(userId: string) {
    const user = await this.findById(userId)
    if (!user) return null

    return this.presentPublicProfile(user)
  }

  private presentMe(user: User): Me {
    return {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastActivityDate: user.lastActivityDate,
      lessonsCompletedCount: Number(user.lessonsCompletedCount || 0),
    }
  }

  private presentPublicProfile(user: User): PublicUser {
    return {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lessonsCompletedCount: Number(user.lessonsCompletedCount || 0),
    }
  }

  async searchByUsername(query: string, page: number, limit: number) {
    const paginatedUsers = await User.query()
      .whereILike('username', `${query}%`)
      .withCount('lesson_completions')
      .orderBy('username', 'asc')
      .paginate(page, limit)

    const serializedData = paginatedUsers.all().map((user) => {
      return this.presentPublicProfile(user)
    })

    return {
      meta: paginatedUsers.getMeta(),
      data: serializedData,
    }
  }
}

export default new UserService()
