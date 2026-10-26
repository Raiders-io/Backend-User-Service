import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import drive from '@adonisjs/drive/services/main'
import sharp from 'sharp'

import { AVATAR_CONSTRAINTS, BACKGROUND_CONSTRAINTS } from '#constants/assets_constants'
import { FriendshipStatus } from '#constants/friendship_status'
import { generateUniqueTemporaryUsername } from '#services/utils_service'
import eventPublisher from '#constants/events'
import type { updateUserValidator } from '#validators/user'
import type { Infer } from '@vinejs/vine/types'
import type { Me, PublicUser } from '#constants/user_constants'
import {
  AvatarMetadataUnreadableException,
  AvatarResolutionTooHighException,
  AvatarResolutionTooLowException,
  AssetUploadFailedException,
  BackgroundMetadataUnreadableException,
  BackgroundResolutionTooHighException,
  BackgroundResolutionTooLowException,
} from '#exceptions/assets_exception'

type UpdateUserPayload = Infer<typeof updateUserValidator>
type AvatarFile = NonNullable<UpdateUserPayload['avatar']>
type BackgroundFile = NonNullable<UpdateUserPayload['background']>

export class UserService {
  async queryById(id: string) {
    return this.query().where('users.id', id).first()
  }

  async create(id: string) {
    const username = await generateUniqueTemporaryUsername(id)
    await User.create({ id, username })
    return this.queryById(id) as Promise<User>
  }

  async findEnsuredById(id: string) {
    return (await this.queryById(id)) ?? this.create(id)
  }

  async findById(id: string) {
    const user = await this.queryById(id)
    return user ? this.toPublic(user) : null
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const user = await this.query().where('users.username', username).first()
    return user ? this.toPublic(user) : null
  }

  async searchByUsername(search: string, page: number, limit: number) {
    const result = await this.query()
      .whereILike('users.username', `${search}%`)
      .orderBy('users.username', 'asc')
      .paginate(page, limit)

    return {
      meta: result.getMeta(),
      data: result.all().map((user) => this.toPublic(user)),
    }
  }

  async getMe(id: string): Promise<Me> {
    return this.toMe(await this.findEnsuredById(id))
  }

  async update(id: string, payload: UpdateUserPayload): Promise<Me> {
    const { avatar, background, ...rest } = payload
    const user = await this.findEnsuredById(id)

    if (avatar) {
      const old = user.avatarUrl
      user.avatarUrl = await this.uploadAvatar(user.id, avatar)
      if (old)
        await drive
          .use()
          .delete(old)
          .catch(() => {})
    }

    if (background) {
      const old = user.backgroundUrl
      user.backgroundUrl = await this.uploadBackground(user.id, background)
      if (old)
        await drive
          .use()
          .delete(old)
          .catch(() => {})
    }

    user.merge(rest)

    await user.save()

    const fresh = (await this.queryById(id))!

    await eventPublisher.publish('data.updated', { user: this.toPublic(fresh) })

    if (rest.username) {
      await eventPublisher.publish('username.updated', {
        userId: fresh.id,
        username: fresh.username,
      })
    }

    return this.toMe(fresh)
  }

  async delete(id: string) {
    const user = await this.findEnsuredById(id)
    await user.delete()
  }

  private query() {
    return User.query()
      .select('users.*')
      .select(
        db
          .from('friendships')
          .where('status', FriendshipStatus.ACCEPTED)
          .where((q) =>
            q.where('user_id', db.ref('users.id')).orWhere('friend_id', db.ref('users.id'))
          )
          .count('*')
          .as('friendsCount')
      )
      .withCount('lesson_completions', (q) => q.as('lessonsCompletedCount'))
  }

  private async uploadAvatar(userId: string, avatar: AvatarFile): Promise<string> {
    const { MIN_SIZE, MAX_SIZE, OUTPUT_SIZE, OUTPUT_QUALITY } = AVATAR_CONSTRAINTS
    const { width, height } = await sharp(avatar.tmpPath).metadata()

    if (!width || !height) throw new AvatarMetadataUnreadableException()
    if (width < MIN_SIZE || height < MIN_SIZE) throw new AvatarResolutionTooLowException(MIN_SIZE)
    if (width > MAX_SIZE || height > MAX_SIZE) throw new AvatarResolutionTooHighException(MAX_SIZE)

    try {
      const buffer = await sharp(avatar.tmpPath)
        .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: 'cover', position: 'center' })
        .webp({ quality: OUTPUT_QUALITY })
        .toBuffer()

      const key = `avatars/${userId}-${Date.now()}.webp`
      await drive.use().put(key, buffer)
      return key
    } catch {
      throw new AssetUploadFailedException()
    }
  }

  private async uploadBackground(userId: string, background: BackgroundFile): Promise<string> {
    const { MIN_WIDTH, MIN_HEIGHT, MAX_SIZE, OUTPUT_WIDTH, OUTPUT_HEIGHT, OUTPUT_QUALITY } =
      BACKGROUND_CONSTRAINTS

    const { width, height } = await sharp(background.tmpPath).metadata()

    if (!width || !height) throw new BackgroundMetadataUnreadableException()
    if (width < MIN_WIDTH || height < MIN_HEIGHT)
      throw new BackgroundResolutionTooLowException(MIN_WIDTH)
    if (width > MAX_SIZE || height > MAX_SIZE)
      throw new BackgroundResolutionTooHighException(MAX_SIZE)

    try {
      const buffer = await sharp(background.tmpPath)
        .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, { fit: 'cover', position: 'center' })
        .webp({ quality: OUTPUT_QUALITY })
        .toBuffer()

      const key = `backgrounds/${userId}-${Date.now()}.webp`
      await drive.use().put(key, buffer)
      return key
    } catch {
      throw new AssetUploadFailedException()
    }
  }

  private toPublic(user: User): PublicUser {
    return {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lessonsCompletedCount: user.lessonsCompletedCount,
      friendsCount: user.friendsCount,
      avatarUpdatedAt: user.avatarUpdatedAt,
      backgroundUpdatedAt: user.backgroundUpdatedAt,
    }
  }

  private toMe(user: User): Me {
    return { ...this.toPublic(user), lastActivityDate: user.lastActivityDate }
  }
}

export default new UserService()
