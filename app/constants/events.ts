import type { Me, PublicUser } from './user_constants.ts'

export const STREAM_NAME: string = 'user.service'

export interface UserUpdatedEvent {
  type: 'user.data.updated'
  date: Date
  payload: {
    user: PublicUser
  }
}

