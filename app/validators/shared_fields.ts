import vine from '@vinejs/vine'
import { USER_CONSTRAINTS } from '#constants/user_constants'

export const email = () => vine.string().email().maxLength(USER_CONSTRAINTS.EMAIL_MAX_LENGTH)

export const bio = () => vine.string().trim().maxLength(USER_CONSTRAINTS.BIO_MAX_LENGTH)

export const username = () =>
  vine
    .string()
    .alphaNumeric({ allowUnderscores: true })
    .toLowerCase()
    .trim()
    .minLength(1)
    .maxLength(USER_CONSTRAINTS.USERNAME_MAX_LENGTH)

export const name = () => vine.string().trim().maxLength(USER_CONSTRAINTS.NAME_MAX_LENGTH)

export const avatar = () =>
  vine.file({
    size: `${USER_CONSTRAINTS.AVATAR_MAX_SIZE_MB}mb`,
    extnames: [...USER_CONSTRAINTS.AVATAR_ALLOWED_EXTENSIONS],
  })
