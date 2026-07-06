import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'friendships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('user_id').notNullable().references('id').inTable('profiles').onDelete('CASCADE')
      table.uuid('friend_id').notNullable().references('id').inTable('profiles').onDelete('CASCADE')
      table.enum('status', ['pending', 'accepted']).defaultTo('pending')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
