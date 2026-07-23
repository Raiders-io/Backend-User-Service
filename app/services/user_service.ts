import type { FieldContext } from '@vinejs/vine/types'
import type { Database } from '@adonisjs/lucid/database'
import User from '#models/user'
import UserNotFoundException from '#exceptions/user_not_found_exception'

export async function isUsernameAvailable(db: Database, value: string, field: FieldContext) {
  const query = db.from('profiles').where('username', value)

  const currentUserId = field.meta.userId
  if (currentUserId) {
    query.whereNot('user_id', currentUserId)
  }

  const existing = await query.first()

  return !existing
}

export default class UserService {
  async create(id: string, payload: Partial<User>) {
    return User.create({ ...payload, id })
  }

  async findById(id: string) {
    const user = await User.find(id)
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }

  async update(id: string, payload: Partial<User>) {
    const user = await this.findById(id)
    user.merge(payload)
    await user.save()
    return user
  }

  async delete(id: string) {
    const user = await this.findById(id)
    await user.delete()
  }
}
