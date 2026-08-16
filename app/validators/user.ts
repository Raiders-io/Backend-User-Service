import vine from '@vinejs/vine'
import { username, name, bio, avatar } from '#validators/shared_fields'
import { isUsernameAvailable } from '#services/user_service'

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
