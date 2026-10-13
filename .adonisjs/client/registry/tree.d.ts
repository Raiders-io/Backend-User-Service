/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  users: {
    showMe: typeof routes['users.show_me']
    update: typeof routes['users.update']
    search: typeof routes['users.search']
    show: typeof routes['users.show']
    getAvatar: typeof routes['users.get_avatar']
  }
  lessons: {
    completed: typeof routes['lessons.completed']
    ongoing: typeof routes['lessons.ongoing']
    status: typeof routes['lessons.status']
    subscribe: typeof routes['lessons.subscribe']
    unsubscribe: typeof routes['lessons.unsubscribe']
  }
  friends: {
    index: typeof routes['friends.index']
    pendingRequests: typeof routes['friends.pending_requests']
    sentRequests: typeof routes['friends.sent_requests']
    sendRequest: typeof routes['friends.send_request']
    cancelRequest: typeof routes['friends.cancel_request']
    destroy: typeof routes['friends.destroy']
    acceptRequest: typeof routes['friends.accept_request']
    declineRequest: typeof routes['friends.decline_request']
  }
}
