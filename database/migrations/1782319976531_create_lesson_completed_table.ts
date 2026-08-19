import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lesson_completed'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('lesson_id').notNullable()

      table.timestamp('completed_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
