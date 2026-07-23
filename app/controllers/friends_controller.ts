import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  /**
   * Display a list of resource
   */
  async indexMe({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async storeMe({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroyMe({ params }: HttpContext) {}
}
