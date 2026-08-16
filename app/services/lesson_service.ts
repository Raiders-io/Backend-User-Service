import LessonCompleted from '#models/lesson_completion'
import LessonOngoing from '#models/lesson_ongoing'

export class LessonService {
  async lessonsCompleted(userId: string, page: number, limit: number) {
    return LessonCompleted.query()
      .where('user_id', userId)
      .orderBy('completed_at', 'desc')
      .paginate(page, limit)
  }

  async lessonsOngoing(userId: string, page: number, limit: number) {
    return LessonOngoing.query()
      .where('user_id', userId)
      .orderBy('started_at', 'desc')
      .paginate(page, limit)
  }
}
