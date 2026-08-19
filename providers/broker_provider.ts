import User from '#models/user'
import LessonService from '#services/lesson_service'
import UserService from '#services/user_service'
import type { ApplicationService } from '@adonisjs/core/types'
import { type ApiEvent, Broker, consume, MsgCriticalError, publish } from '@yosone/broker'

export default class BrokerProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    Broker.init({
      group: 'user-service',
      consumer: 'user-consumer',
      redisUrl: process.env.REDIS_URL || 'redis://redis:6380',
      logLevel: 4,
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  async onUserDeleted(event: ApiEvent<any>) {
    const userId: string = event.payload.userId
    if (userId) {

      const results = await Promise.allSettled([
        UserService.delete(userId),
        LessonService.deleteAllLessonData(userId),
      ])

      results.forEach((result) => {
        if (result.status === 'rejected') {
          throw new MsgCriticalError('Database down')
        }
      })
    }
  }

  /**
   * The process has been started
   */
  async ready() {
    consume('auth.service')
      .on('auth.user.deleted', this.onUserDeleted)
      .on('auth.user.created', async (event: ApiEvent<any>) => {
        const userId: string = event.payload.userId
        if (userId) await UserService.create(userId)
      })
      .start()
    consume('lesson.service')
      .on('lesson.started', async (event: ApiEvent<any>) => {
        
      })
      .start()
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    Broker.disconnect()
  }
}
