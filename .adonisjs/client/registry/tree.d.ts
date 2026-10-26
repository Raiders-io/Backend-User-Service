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
    showByUsername: typeof routes['users.show_by_username']
    show: typeof routes['users.show']
    getAvatar: typeof routes['users.get_avatar']
    getBackground: typeof routes['users.get_background']
    usernameAvailable: typeof routes['users.username_available']
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
    getStatus: typeof routes['friends.get_status']
    destroy: typeof routes['friends.destroy']
    acceptRequest: typeof routes['friends.accept_request']
    declineRequest: typeof routes['friends.decline_request']
  }
}
