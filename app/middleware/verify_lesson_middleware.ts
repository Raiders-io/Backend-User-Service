import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    lesson?: any
  }
}

type VerifyLessonOptions = {
  param?: string
}

export default class VerifyLessonMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: VerifyLessonOptions = {}) {
    const paramName = options.param ?? 'lessonId'
    const lessonId = ctx.params[paramName] ?? ctx.request.input(paramName)

    if (!lessonId) {
      return ctx.response.badRequest({ message: 'Lesson id is required' })
    }

    const url = `${env.get('LESSONS_SERVICE_URL')}/api/v1/lessons/byId/${encodeURIComponent(lessonId)}`

    let response: Response
    try {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: ctx.request.header('Authorization') || '',
        },
        signal: AbortSignal.timeout(5000),
      })
    } catch (error) {
      ctx.logger.error({ err: error, lessonId }, 'Lessons service unreachable')
      return ctx.response.serviceUnavailable({ message: 'Lessons service unavailable' })
    }

    if (response.status === 404) {
      return ctx.response.notFound({ message: `Lesson ${lessonId} not found` })
    }

    if (response.status === 401 || response.status === 403) {
      return ctx.response
        .status(response.status)
        .send({ message: 'Not authorized to access this lesson' })
    }

    if (!response.ok) {
      ctx.logger.error({ status: response.status, lessonId }, 'Unexpected lessons service response')
      return ctx.response.badGateway({ message: 'Unable to validate lesson' })
    }

    ctx.lesson = await response.json()

    return next()
  }
}
