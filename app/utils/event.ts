import type {
  FileAttachedEvent,
  FileDeletedEvent,
  FileDetachedEvent,
  LessonCreatedEvent,
  LessonDeletedEvent,
  LessonUpdatedEvent,
} from '#utils/types'

const service = 'lesson'

class EventGenerator {
  lessonDeleted(lessonId: string | string[], authorId: string): LessonDeletedEvent {
    return {
      payload: {
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.lesson.deleted`,
    }
  }

  lessonCreated(lessonId: string, authorId: string): LessonCreatedEvent {
    return {
      payload: {
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.lesson.created`,
    }
  }

  lessonUpdated(lessonId: string, authorId: string): LessonUpdatedEvent {
    return {
      payload: {
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.lesson.updated`,
    }
  }

  fileAttached(filename: string | string[], lessonId: string, authorId: string): FileAttachedEvent {
    return {
      payload: {
        filename: filename,
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.file.attached`,
    }
  }

  fileDetached(
    filename: string | string[],
    lessonId: string | string[],
    authorId: string
  ): FileDetachedEvent {
    return {
      payload: {
        filename: filename,
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.file.detached`,
    }
  }

  fileDeleted(filename: string, lessonId: string | string[], authorId: string): FileDeletedEvent {
    return {
      payload: {
        filename: filename,
        lessonId: lessonId,
        authorId: authorId,
        date: new Date(),
      },
      type: `${service}.file.deleted`,
    }
  }
}

export default new EventGenerator()
