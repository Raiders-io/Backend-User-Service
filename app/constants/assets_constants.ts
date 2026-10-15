export const AVATAR_CONSTRAINTS = {
  MIN_SIZE: 200,
  MAX_SIZE: 5000,
  MAX_FILE_SIZE: '2mb',
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
  OUTPUT_SIZE: 512,
  OUTPUT_QUALITY: 80,
} as const

export const BACKGROUND_CONSTRAINTS = {
  MIN_WIDTH: 600,
  MIN_HEIGHT: 200,
  MAX_SIZE: 5000,
  MAX_FILE_SIZE: '2mb',
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp'],
  OUTPUT_WIDTH: 1200,
  OUTPUT_HEIGHT: 400,
  OUTPUT_QUALITY: 80,
} as const
