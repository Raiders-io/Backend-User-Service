import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATION } from '../constants/global_constants.ts'

export function getUserId(ctx: HttpContext): string {
  const userId = ctx.userId
  if (!userId) {
    throw new UserIdNotFoundException()
  }
  return userId
}

export function getPaginationParams(ctx: HttpContext) {
  const page = Math.max(ctx.request.input('page', DEFAULT_PAGINATION.DEFAULT_PAGE), 1)
  const limit = Math.min(
    Math.max(ctx.request.input('limit', DEFAULT_PAGINATION.DEFAULT_LIMIT), 1),
    DEFAULT_PAGINATION.MAX_LIMIT
  )

  return { page, limit }
}
