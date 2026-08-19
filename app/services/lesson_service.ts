import LessonCompleted from '#models/lesson_completion'
import LessonOngoing from '#models/lesson_ongoing'

class LessonService {
  async startLesson(userId: string, lessonId: string) {
    return LessonOngoing.create({
      userId,
      lessonId,
    })
  }

  async completeLesson(userId: string, lessonId: string) {
    await LessonOngoing.query().where('user_id', userId).where('lesson_id', lessonId).delete()

    return LessonCompleted.create({
      userId,
      lessonId,
    })
  }

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

  async deleteOngoingLesson(userId: string, lessonId: string) {
    await LessonOngoing.query().where('user_id', userId).where('lesson_id', lessonId).delete()
  }

  async resetOngoingLessons(userId: string) {
    await LessonOngoing.query().where('user_id', userId).delete()
  }

  async deleteAllLessonData(userId: string) {
    await Promise.all([
      LessonCompleted.query().where('user_id', userId).delete(),
      LessonOngoing.query().where('user_id', userId).delete(),
    ])
  }
}

export default new LessonService()
