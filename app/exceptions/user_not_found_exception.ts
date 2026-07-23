import { Exception } from '@adonisjs/core/exceptions'

export default class UserNotFoundException extends Exception {
  static status = 500
  static code = 'E_USER_NOT_FOUND'
  static message = 'User not found'
}
