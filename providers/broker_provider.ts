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

  async handleUserDeleted(event: ApiEvent<any>) {
    const userId: string = event.payload.userId
    if (!userId) return

    const results = await Promise.allSettled([
      UserService.delete(userId),
      LessonService.deleteAllLessonData(userId),
    ])

    const failures = results.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected'
    )

    if (failures.length > 0) {
      const reasons = failures.map((f) => f.reason?.message ?? f.reason).join(' | ')
      throw new MsgCriticalError(`Failed to fully process user deletion for ${userId}: ${reasons}`)
    }
  }

  async handleLessonStarted(event: ApiEvent<any>) {
    const { userId, lessonId } = event.payload
    if (!userId || !lessonId) return
    await LessonService.startLesson(userId, lessonId)
  }

  async handleLessonCompleted(event: ApiEvent<any>) {
    const { userId, lessonId } = event.payload
    if (!userId || !lessonId) return
    await LessonService.completeLesson(userId, lessonId)
  }

  /**
   * The process has been started
   */
  async ready() {
    consume('auth.service')
      .on('auth.user.deleted', this.handleUserDeleted)
      .on('auth.user.created', async (event: ApiEvent<any>) => {
        const userId: string = event.payload.userId
        if (userId) await UserService.create(userId)
      })
      .start()
    consume('lesson.service')
      .on('lesson.started', this.handleLessonStarted)
      .on('lesson.completed', this.handleLessonCompleted)
      .start()
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    Broker.disconnect()
  }
}
