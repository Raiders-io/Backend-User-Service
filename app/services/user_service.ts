import type { FieldContext } from '@vinejs/vine/types'
import type { Database } from '@adonisjs/lucid/database'
import User from '#models/user'
import UserNotFoundException from '#exceptions/user_not_found_exception'
import { MultipartFile } from '@adonisjs/core/types/bodyparser'
import drive from '@adonisjs/drive/services/main'
import sharp from 'sharp'
import { AVATAR_CONSTRAINTS } from '#validators/shared_fields'
import { AvatarMetadataUnreadableException, AvatarResolutionTooHighException, AvatarResolutionTooLowException, AvatarUploadFailedException } from '#exceptions/avatar_exception'

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
    const {avatar, ...rest } = payload

    if (avatar) {
      const metadata = await sharp(avatar.tmpPath).metadata()

      if (!metadata.width || !metadata.height) {
        throw new AvatarMetadataUnreadableException()
      }

      if (metadata.width < AVATAR_CONSTRAINTS.MIN_SIZE || metadata.height < AVATAR_CONSTRAINTS.MIN_SIZE) {
        throw new AvatarResolutionTooLowException(AVATAR_CONSTRAINTS.MIN_SIZE)
      }

      if (metadata.width > AVATAR_CONSTRAINTS.MAX_SIZE || metadata.height > AVATAR_CONSTRAINTS.MAX_SIZE) {
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
          user.avatar_url = await drive.use().getUrl(key)
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
}
