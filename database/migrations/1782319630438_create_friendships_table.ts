import { BaseSchema } from '@adonisjs/lucid/schema'
import { FriendshipStatus } from '../../app/enums/friendship_status.ts'

export default class extends BaseSchema {
  protected tableName = 'friendships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('friend_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table
        .enum('status', Object.values(FriendshipStatus))
        .notNullable()
        .defaultTo(FriendshipStatus.PENDING)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
