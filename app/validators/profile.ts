import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)

export const createProfileValidator = vine.create({
  username: vine.string(),
  firstname: vine.string(),
  lastname: vine.string(),
  email: email(),
  bio: vine.string().trim().maxLength(500).optional(),
})
