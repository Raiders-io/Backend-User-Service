import { FriendshipSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class Friendship extends FriendshipSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
