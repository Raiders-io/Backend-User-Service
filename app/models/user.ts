import { UserSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LessonCompleted from './lesson_completion.ts'
import LessonOngoing from './lesson_ongoing.ts'

export default class User extends UserSchema {
  @hasMany(() => LessonCompleted)
  declare lesson_completions: HasMany<typeof LessonCompleted>

  @hasMany(() => LessonOngoing)
  declare lesson_ongoing: HasMany<typeof LessonOngoing>
}
