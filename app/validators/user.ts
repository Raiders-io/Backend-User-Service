import vine from '@vinejs/vine'
import { username, name, bio, avatar } from '#validators/shared_fields'
import { DEFAULT_PAGINATION } from '#constants/global_constants'
import { isUsernameAvailable } from '#services/utils_service'

export const createUserValidator = vine.create({
  username: username().unique(isUsernameAvailable),
  firstname: name(),
  lastname: name(),
  bio: bio().optional(),
  avatar: avatar().optional(),
})

export const updateUserValidator = vine.create({
  username: username().unique(isUsernameAvailable).optional(),
  firstname: name().optional(),
  lastname: name().optional(),
  bio: bio().optional(),
  avatar: avatar().optional(),
})

export const searchUsersValidator = vine.create({
  q: username().minLength(2),
  page: vine.number().min(1).optional(),
  limit: vine.number().min(1).max(DEFAULT_PAGINATION.MAX_LIMIT).optional(),
})
