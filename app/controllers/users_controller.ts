import { DEFAULT_PAGINATION } from '#constants/global_constants'
import { USER_CONSTRAINTS } from '#constants/user_constants'
import UserAssetNotFoundException from '#exceptions/assets_exception'
import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import UserNotFoundException from '#exceptions/user_not_found_exception'
import UserService from '#services/user_service'
import { getUserId, isUsernameAvailable } from '#services/utils_service'
import { checkUsernameValidator, searchUsersValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class UsersController {
  async showMe(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return UserService.getMe(userId)
  }

  async show({ params, response }: HttpContext) {
    const user = await UserService.findById(params.id)
    if (!user) {
      throw new UserNotFoundException()
    }
    return response.ok(user)
  }

  async showByUsername({ params, response }: HttpContext) {
    const user = await UserService.findByUsername(params.username)
    if (!user) {
      throw new UserNotFoundException()
    }
    return response.ok(user)
  }

  async update(ctx: HttpContext) {
    const { request } = ctx
    const userId = getUserId(ctx)

    const payload = await request.validateUsing(updateUserValidator, {
      meta: { userId },
    })

    return UserService.update(userId, payload)
  }

  async usernameAvailable({ request, response }: HttpContext) {
    const [error] = await checkUsernameValidator.tryValidate(request.qs())
    if (error) {
      const reserved = USER_CONSTRAINTS.RESERVED_USERNAMES.has(
        String(request.qs().username ?? '').toLowerCase()
      )
      return response.ok({ available: false, reason: reserved ? 'reserved' : 'invalid' })
    }
    return response.ok({ available: false, reason: 'Username already taken' })
  }

  async getAvatar({ params, response }: HttpContext) {
    const user = await UserService.queryById(params.id)

    if (!user) {
      throw new UserNotFoundException()
    }

    const path = user.avatarUrl
    console.log(path)
    const disk = drive.use()

    if (!path || !(await disk.exists(path))) {
      throw new UserAssetNotFoundException()
    }

    response.type('image/webp')
    response.header('Cache-Control', 'public, max-age=16400, stale-while-revalidate=604800')

    const stream = await disk.getStream(path)
    return response.stream(stream)
  }

  async getBackground({ params, response }: HttpContext) {
    const user = await UserService.queryById(params.id)

    if (!user) {
      throw new UserNotFoundException()
    }

    const path = user.backgroundUrl
    const disk = drive.use()

    if (!path || !(await disk.exists(path))) {
      throw new UserAssetNotFoundException()
    }

    response.type('image/webp')
    response.header('Cache-Control', 'public, max-age=16400, stale-while-revalidate=604800')

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
