import { LessonOngoingSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class LessonOngoing extends LessonOngoingSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare startedAt: DateTime
}
