import UserService from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}
  /**
   * Show individual record
   */
  async showMe({ request }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    return this.userService.findById(userId)
  }

  async show({ request, params }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    return this.userService.findById(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    const payload = await request.validateUsing(updateUserValidator)
    return this.userService.update(userId, payload)
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    return this.userService.delete(userId)
  }
}
