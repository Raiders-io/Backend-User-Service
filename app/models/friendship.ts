import { FriendshipSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import { FriendshipStatus } from '#constants/friendship_status'
import User from '#models/user'

export default class Friendship extends FriendshipSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'friendId' })
  declare friend: BelongsTo<typeof User>

  @column()
  declare status: FriendshipStatus
}
