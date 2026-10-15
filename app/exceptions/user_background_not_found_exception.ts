import { Exception } from '@adonisjs/core/exceptions'

export default class UserBackgroundNotFoundException extends Exception {
  static status = 500
}
