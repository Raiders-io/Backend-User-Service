import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATION } from '#constants/global_constants'
import { USER_CONSTRAINTS } from '#constants/user_constants'
import type { FieldContext } from '@vinejs/vine/types'
import User from '#models/user'

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

export async function isUsernameAvailable(value: string, field: FieldContext) {
  const query = User.query().where('username', value)
  console.log(query)

  const existing = await query.first()
  return !existing
}

export async function generateUniqueTemporaryUsername(id: string): Promise<string> {
  const suffix = id.replace(/-/g, '').toLowerCase()
  return `user_${suffix}`.slice(0, USER_CONSTRAINTS.USERNAME_MAX_LENGTH)
}
