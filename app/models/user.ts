import { UserSchema } from '#database/schema'
import { column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LessonCompleted from './lesson_completion.ts'
import LessonOngoing from './lesson_ongoing.ts'
import { DateTime } from 'luxon'

export default class User extends UserSchema {
  @hasMany(() => LessonCompleted)
  declare lesson_completions: HasMany<typeof LessonCompleted>

  @hasMany(() => LessonOngoing)
  declare lesson_ongoing: HasMany<typeof LessonOngoing>

  @computed()
  get lessonsCompletedCount() {
    return this.$extras.lessonsCompletedCount ?? undefined
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
