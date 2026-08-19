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
}
