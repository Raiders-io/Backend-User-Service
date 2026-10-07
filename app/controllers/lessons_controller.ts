// import type { HttpContext } from '@adonisjs/core/http'
import LessonService from '#services/lesson_service'
import { getPaginationParams, getUserId } from '#services/utils_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class LessonsController {
  async completed(ctx: HttpContext) {
    const userId = getUserId(ctx)
    const { page, limit } = getPaginationParams(ctx)
    return LessonService.lessonsCompleted(userId, page, limit)
  }

  async ongoing(ctx: HttpContext) {
    const userId = getUserId(ctx)
    const { page, limit } = getPaginationParams(ctx)

    return LessonService.lessonsOngoing(userId, page, limit)
  }

  async subscribe(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return LessonService.startLesson(userId, params.lessonId)
  }

  async unsubscribe(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    await LessonService.deleteOngoingLesson(userId, params.lessonId)
    return ctx.response.noContent()
  }

  async status(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return await LessonService.getStatus(userId, params.lessonId)
  }
}
