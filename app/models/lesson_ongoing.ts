import { LessonOngoingSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class LessonOngoing extends LessonOngoingSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
