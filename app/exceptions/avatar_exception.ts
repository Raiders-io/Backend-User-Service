import { Exception } from '@adonisjs/core/exceptions'

export class AvatarException extends Exception {
  static status = 422
  static code = 'E_AVATAR_INVALID'
}

export class AvatarMetadataUnreadableException extends AvatarException {
  static status = 422
  static code = 'E_AVATAR_METADATA_UNREADABLE'
  message = 'Unable to read image dimensions'
}

export class AvatarResolutionTooLowException extends AvatarException {
  static status = 422
  static code = 'E_AVATAR_RESOLUTION_TOO_LOW'

  constructor(minSize: number) {
    super(`Image resolution is too low (minimum ${minSize}x${minSize}px)`)
  }
}

export class AvatarResolutionTooHighException extends AvatarException {
  static status = 422
  static code = 'E_AVATAR_RESOLUTION_TOO_HIGH'

  constructor(maxSize: number) {
    super(`Image resolution is too high (maximum ${maxSize}x${maxSize}px)`)
  }
}

export class AvatarUploadFailedException extends AvatarException {
  static status = 500
  static code = 'E_AVATAR_UPLOAD_FAILED'
  message = 'Failed to upload avatar'
}
