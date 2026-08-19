import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATION } from '#constants/global_constants'
import { USER_CONSTRAINTS } from '#constants/user_constants'
import type { Database } from '@adonisjs/lucid/database'
import type { FieldContext } from '@vinejs/vine/types'

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

export async function isUsernameAvailable(db: Database, value: string, field: FieldContext) {
  const query = db.from('profiles').where('username', value)

  const currentUserId = field.meta.userId
  if (currentUserId) {
    query.whereNot('user_id', currentUserId)
  }

  const existing = await query.first()

  return !existing
}

export async function generateUniqueTemporaryUsername(id: string): Promise<string> {
  const suffix = id.replace(/-/g, '').toLowerCase()
  return `user_${suffix}`.slice(0, USER_CONSTRAINTS.USERNAME_MAX_LENGTH)
}
