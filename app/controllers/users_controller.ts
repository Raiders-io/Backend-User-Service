import UserService from '#services/user_service'
import { getUserId } from '#services/utils_service'
import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async showMe(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return this.userService.findById(userId)
  }

  async show({ params }: HttpContext) {
    return this.userService.findById(params.id)
  }

  async update(ctx: HttpContext) {
    const { request } = ctx
    const userId = getUserId(ctx)

    const payload = await request.validateUsing(updateUserValidator)
    return this.userService.update(userId, payload)
  }

  async destroy(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return this.userService.delete(userId)
  }
}
