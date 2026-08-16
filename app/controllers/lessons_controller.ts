// import type { HttpContext } from '@adonisjs/core/http'

import { LessonService } from '#services/lesson_service'
import { getPaginationParams, getUserId } from '#services/utils_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LessonsController {
  constructor(private lessonService: LessonService) {}

  async completed(ctx: HttpContext) {
    const userId = getUserId(ctx)
    const { page, limit } = getPaginationParams(ctx)

    return this.lessonService.lessonsCompleted(userId, page, limit)
  }

  async ongoing(ctx: HttpContext) {
    const userId = getUserId(ctx)
    const { page, limit } = getPaginationParams(ctx)

    return this.lessonService.lessonsOngoing(userId, page, limit)
  }
}
