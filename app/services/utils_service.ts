import UserIdNotFoundException from '#exceptions/user_id_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'

export function getUserId(ctx: HttpContext): string {
  const userId = ctx.userId
  if (!userId) {
    throw new UserIdNotFoundException()
  }
  return userId
}
