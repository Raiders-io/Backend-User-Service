import { FriendshipSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import { FriendshipStatus } from '../enums/friendship_status.ts'

export default class Friendship extends FriendshipSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'friendId' })
  declare friend: BelongsTo<typeof User>

  @column()
  declare status: FriendshipStatus
}
