import { Exception } from '@adonisjs/core/exceptions'

export default class UserIdNotFoundException extends Exception {
  static status = 401
  static code = 'E_USER_ID_NOT_FOUND'
  static message = 'User ID not found in context'
}
