/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'users.show_me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/me',
    tokens: [{"old":"/api/v1/profile/me","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['users.show_me']['types'],
  },
  'users.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/profile/me',
    tokens: [{"old":"/api/v1/profile/me","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'lessons.completed': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/me/lessons/completed',
    tokens: [{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"me","end":""},{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"lessons","end":""},{"old":"/api/v1/profile/me/lessons/completed","type":0,"val":"completed","end":""}],
    types: placeholder as Registry['lessons.completed']['types'],
  },
  'lessons.ongoing': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/me/lessons/ongoing',
    tokens: [{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"me","end":""},{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"lessons","end":""},{"old":"/api/v1/profile/me/lessons/ongoing","type":0,"val":"ongoing","end":""}],
    types: placeholder as Registry['lessons.ongoing']['types'],
  },
  'lessons.status': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/me/lessons/:lessonId',
    tokens: [{"old":"/api/v1/profile/me/lessons/:lessonId","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId","type":0,"val":"me","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId","type":0,"val":"lessons","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId","type":1,"val":"lessonId","end":""}],
    types: placeholder as Registry['lessons.status']['types'],
  },
  'lessons.subscribe': {
    methods: ["POST"],
    pattern: '/api/v1/profile/me/lessons/:lessonId/subscribe',
    tokens: [{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"me","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"lessons","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":1,"val":"lessonId","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/subscribe","type":0,"val":"subscribe","end":""}],
    types: placeholder as Registry['lessons.subscribe']['types'],
  },
  'lessons.unsubscribe': {
    methods: ["DELETE"],
    pattern: '/api/v1/profile/me/lessons/:lessonId/unsubscribe',
    tokens: [{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"api","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"me","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"lessons","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":1,"val":"lessonId","end":""},{"old":"/api/v1/profile/me/lessons/:lessonId/unsubscribe","type":0,"val":"unsubscribe","end":""}],
    types: placeholder as Registry['lessons.unsubscribe']['types'],
  },
  'users.search': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/search',
    tokens: [{"old":"/api/v1/profile/search","type":0,"val":"api","end":""},{"old":"/api/v1/profile/search","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/search","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['users.search']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/:id',
    tokens: [{"old":"/api/v1/profile/:id","type":0,"val":"api","end":""},{"old":"/api/v1/profile/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/:id","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.get_avatar': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile/:id/avatar',
    tokens: [{"old":"/api/v1/profile/:id/avatar","type":0,"val":"api","end":""},{"old":"/api/v1/profile/:id/avatar","type":0,"val":"v1","end":""},{"old":"/api/v1/profile/:id/avatar","type":0,"val":"profile","end":""},{"old":"/api/v1/profile/:id/avatar","type":1,"val":"id","end":""},{"old":"/api/v1/profile/:id/avatar","type":0,"val":"avatar","end":""}],
    types: placeholder as Registry['users.get_avatar']['types'],
  },
  'friends.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/friends/me',
    tokens: [{"old":"/api/v1/friends/me","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['friends.index']['types'],
  },
  'friends.pending_requests': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/friends/me/requests',
    tokens: [{"old":"/api/v1/friends/me/requests","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests","type":0,"val":"requests","end":""}],
    types: placeholder as Registry['friends.pending_requests']['types'],
  },
  'friends.sent_requests': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/friends/me/requests/sent',
    tokens: [{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"requests","end":""},{"old":"/api/v1/friends/me/requests/sent","type":0,"val":"sent","end":""}],
    types: placeholder as Registry['friends.sent_requests']['types'],
  },
  'friends.send_request': {
    methods: ["POST"],
    pattern: '/api/v1/friends/me/requests/:friendId',
    tokens: [{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"requests","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":1,"val":"friendId","end":""}],
    types: placeholder as Registry['friends.send_request']['types'],
  },
  'friends.cancel_request': {
    methods: ["DELETE"],
    pattern: '/api/v1/friends/me/requests/:friendId',
    tokens: [{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":0,"val":"requests","end":""},{"old":"/api/v1/friends/me/requests/:friendId","type":1,"val":"friendId","end":""}],
    types: placeholder as Registry['friends.cancel_request']['types'],
  },
  'friends.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/friends/me/:friendId',
    tokens: [{"old":"/api/v1/friends/me/:friendId","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/:friendId","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/:friendId","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/:friendId","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/:friendId","type":1,"val":"friendId","end":""}],
    types: placeholder as Registry['friends.destroy']['types'],
  },
  'friends.accept_request': {
    methods: ["PATCH"],
    pattern: '/api/v1/friends/me/requests/:askingId/accept',
    tokens: [{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"requests","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":1,"val":"askingId","end":""},{"old":"/api/v1/friends/me/requests/:askingId/accept","type":0,"val":"accept","end":""}],
    types: placeholder as Registry['friends.accept_request']['types'],
  },
  'friends.decline_request': {
    methods: ["PATCH"],
    pattern: '/api/v1/friends/me/requests/:askingId/decline',
    tokens: [{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"api","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"v1","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"friends","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"me","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"requests","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":1,"val":"askingId","end":""},{"old":"/api/v1/friends/me/requests/:askingId/decline","type":0,"val":"decline","end":""}],
    types: placeholder as Registry['friends.decline_request']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
