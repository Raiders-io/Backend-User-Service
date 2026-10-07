import { Exception } from '@adonisjs/core/exceptions'

export default class UserAvatarNotFoundException extends Exception {
  static status = 401
  static code = 'E_USER_AVATAR_NOT_FOUND'
  static message = 'User Avatar not found'
}
