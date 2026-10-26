import type User from '#models/user'

export const USER_CONSTRAINTS = {
  USERNAME_MAX_LENGTH: 20,
  EMAIL_MAX_LENGTH: 254,
  BIO_MAX_LENGTH: 5000,
  NAME_MAX_LENGTH: 30,
  ASSETS_MAX_SIZE_MB: 2,
  ASSETS_ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
  RESERVED_USERNAMES: new Set([
    'me',
    'search',
    'u',
    'admin',
    'api',
    'avatar',
    'background',
    'friends',
    'lessons',
  ]),
} as const

export type PublicUser = Pick<
  User,
  | 'id'
  | 'username'
  | 'firstname'
  | 'lastname'
  | 'bio'
  | 'currentStreak'
  | 'longestStreak'
  | 'avatarUpdatedAt'
  | 'backgroundUpdatedAt'
> & {
  lessonsCompletedCount: number
  friendsCount: number
}

export type Me = PublicUser & Pick<User, 'lastActivityDate'>
