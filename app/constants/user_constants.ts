import type User from '#models/user'

export const USER_CONSTRAINTS = {
  USERNAME_MAX_LENGTH: 20,
  EMAIL_MAX_LENGTH: 254,
  BIO_MAX_LENGTH: 500,
  NAME_MAX_LENGTH: 30,
  AVATAR_MAX_SIZE_MB: 2,
  AVATAR_ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
} as const

export type PublicUser = Pick<
  User,
  'id' | 'username' | 'firstname' | 'lastname' | 'bio' | 'avatarUrl' | 'currentStreak'
>

export type Me = PublicUser &
  Pick<User, 'longestStreak' | 'lastActivityDate'> & {
    lessonsCompletedCount: number
  }
