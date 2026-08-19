import { DEFAULT_PAGINATION } from '#constants/global_constants'
import UserService from '#services/user_service'
import { getUserId } from '#services/utils_service'
import { searchUsersValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async showMe(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return UserService.getMe(userId)
  }

  async show({ params }: HttpContext) {
    return UserService.getPublicProfile(params.id)
  }

  async update(ctx: HttpContext) {
    const { request } = ctx
    const userId = getUserId(ctx)

    const payload = await request.validateUsing(updateUserValidator)
    return UserService.update(userId, payload)
  }

  async search(ctx: HttpContext) {
    const { request } = ctx
    const {
      q,
      page = DEFAULT_PAGINATION.DEFAULT_PAGE,
      limit = DEFAULT_PAGINATION.DEFAULT_LIMIT,
    } = await request.validateUsing(searchUsersValidator)

    return UserService.searchByUsername(q, page, limit)
  }
}
