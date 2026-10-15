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

export class AssetUploadFailedException {
  static status = 500
  static code = 'E_ASSET_UPLOAD_FAILED'
  message = 'Failed to upload an asset'
}

export default class UserAssetNotFoundException extends Exception {
  static status = 404
  static code = 'E_USER_ASSET_NOT_FOUND'
  static message = 'User Asset not found'
}

export class BackgroundException extends Exception {
  static status = 422
  static code = 'E_BACKGROUND_INVALID'
}

export class BackgroundMetadataUnreadableException extends BackgroundException {
  static status = 422
  static code = 'E_BACKGROUND_METADATA_UNREADABLE'
  message = 'Unable to read background image dimensions'
}

export class BackgroundResolutionTooLowException extends BackgroundException {
  static status = 422
  static code = 'E_BACKGROUND_RESOLUTION_TOO_LOW'

  constructor(minSize: number) {
    super(`Background resolution is too low (minimum width/height of ${minSize}px)`)
  }
}

export class BackgroundResolutionTooHighException extends BackgroundException {
  static status = 422
  static code = 'E_BACKGROUND_RESOLUTION_TOO_HIGH'

  constructor(maxSize: number) {
    super(`Background resolution is too high (maximum ${maxSize}px)`)
  }
}
