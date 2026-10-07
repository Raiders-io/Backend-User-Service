import { publish as brokerPublish } from '@yosone/broker'
import type { PublicUser } from './user_constants.ts'

export const SERVICE: string = 'user'
export const STREAM_NAME: string = `${SERVICE}.service`

type EventMap = {
  'data.updated': { user: PublicUser }
  'username.updated': { userId: string; username: string }
}

class EventPublisher {
  async publish<K extends keyof EventMap>(type: K, payload: EventMap[K]) {
    const event = {
      type: `${SERVICE}.${type}`,
      payload: { ...payload, date: new Date() },
    }

    brokerPublish(type, event)
    return event
  }
}

export default new EventPublisher()
