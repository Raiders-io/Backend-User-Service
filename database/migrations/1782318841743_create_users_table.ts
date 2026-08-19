import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.string('username').unique().notNullable()
      table.string('firstname').nullable()
      table.string('lastname').nullable()
      table.string('bio')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('avatar_url').nullable()
      table.integer('current_streak').notNullable().defaultTo(0)
      table.integer('longest_streak').notNullable().defaultTo(0)
      table.date('last_activity_date').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
