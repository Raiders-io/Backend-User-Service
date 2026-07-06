import { UserSchema } from '#database/schema'
import { hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import LessonCompleted from './lesson_completion.ts'
import LessonOngoing from './lesson_ongoing.ts'

export default class User extends UserSchema {
  @manyToMany(() => User, {
    pivotTable: 'friendships',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'friend_id',
    pivotColumns: ['status'],
  })
  declare friends: ManyToMany<typeof User>

  @hasMany(() => LessonCompleted)
  declare lesson_completions: HasMany<typeof LessonCompleted>

  @hasMany(() => LessonOngoing)
  declare lesson_ongoing: HasMany<typeof LessonOngoing>
}
