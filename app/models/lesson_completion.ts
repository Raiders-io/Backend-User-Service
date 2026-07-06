import { LessonCompletedSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class LessonCompleted extends LessonCompletedSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
