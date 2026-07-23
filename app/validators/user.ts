import isUsernameAvailable from '#services/user_service'
import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const bio = () => vine.string().trim().maxLength(500)
const username = () => vine.string().alphaNumeric().toLowerCase().trim().maxLength(20)
const name = () => vine.string().trim().maxLength(30)

export const createUserValidator = vine.create({
  username: username().unique(isUsernameAvailable),
  email: email(),
  firstname: name(),
  lastname: name(),
  bio: bio().optional(),
})

export const updateUserValidator = vine.create({
  username: username().unique(isUsernameAvailable).optional(),
  email: email().optional(),
  firstname: name().optional(),
  lastname: name().optional(),
  bio: bio().optional(),
})
