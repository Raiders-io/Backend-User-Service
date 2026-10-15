import { DEFAULT_PAGINATION } from '#constants/global_constants'
import UserAssetNotFoundException from '#exceptions/assets_exception'
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

  async showByUsername({ params, response }: HttpContext) {
    const user = await UserService.findByUsername(params.username)
    return response.ok(user)
  }

  async update(ctx: HttpContext) {
    const { request } = ctx
    const userId = getUserId(ctx)

    const payload = await request.validateUsing(updateUserValidator)
    return UserService.update(userId, payload)
  }

  async getAvatar({ params, response }: HttpContext) {
    const user = await UserService.findExistingById(params.id)

    if (!user) {
      throw new UserIdNotFoundException()
    }

    const path = user.avatarUrl
    const disk = drive.use()

    if (!path || !(await disk.exists(path))) {
      throw new UserAssetNotFoundException()
    }

    response.type(path)
    response.header('Cache-Control', 'public, max-scale=86400, stale-while-revalidate=604800')

    const stream = await disk.getStream(path)
    return response.stream(stream)
  }

  async getBackground({ params, response }: HttpContext) {
    const user = await UserService.findExistingById(params.id)

    if (!user) {
      throw new UserIdNotFoundException()
    }

    const path = user.backgroundUrl
    const disk = drive.use()

    if (!path || !(await disk.exists(path))) {
      throw new UserAssetNotFoundException()
    }

    response.type(path)
    response.header('Cache-Control', 'public, max-scale=86400, stale-while-revalidate=604800')

    const stream = await disk.getStream(path)
    return response.stream(stream)
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
