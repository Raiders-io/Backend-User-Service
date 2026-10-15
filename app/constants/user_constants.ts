import type User from '#models/user'

export const USER_CONSTRAINTS = {
  USERNAME_MAX_LENGTH: 20,
  EMAIL_MAX_LENGTH: 254,
  BIO_MAX_LENGTH: 1000,
  NAME_MAX_LENGTH: 30,
  ASSETS_MAX_SIZE_MB: 2,
  ASSETS_ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
} as const

export type PublicUser = Pick<
  User,
  'id' | 'username' | 'firstname' | 'lastname' | 'bio' | 'currentStreak' | 'longestStreak'
> & {
  lessonsCompletedCount: number
  friendsCount: number
}

export type Me = PublicUser & Pick<User, 'lastActivityDate'>
