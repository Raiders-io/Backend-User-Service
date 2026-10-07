import { DEFAULT_PAGINATION } from '#constants/global_constants'
import UserAvatarNotFoundException from '#exceptions/user_avatar_not_found_exception'
import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import UserService from '#services/user_service'
import { getUserId } from '#services/utils_service'
import { searchUsersValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

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

  async getAvatar({ params, response }: HttpContext) {
    const user = await UserService.getPublicProfile(params.id)

    if (!user) {
      throw new UserIdNotFoundException()
    }

    const path = user.avatarUrl

    if (!path) {
      throw new UserAvatarNotFoundException()
    }

    const disk = drive.use()

    if (!(await disk.exists(path))) {
      throw new UserAvatarNotFoundException()
    }

    return response.redirect(await drive.use().getUrl(path))
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
