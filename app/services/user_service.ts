import type { FieldContext } from '@vinejs/vine/types'
import type { Database } from '@adonisjs/lucid/database'

export default async function isUsernameAvailable(
  db: Database,
  value: string,
  field: FieldContext
) {
  const query = db.from('profiles').where('username', value)

  const currentUserId = field.meta.userId
  if (currentUserId) {
    query.whereNot('user_id', currentUserId)
  }

  const existing = await query.first()

  return !existing
}
