/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/assets/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'users.show_me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['showMe']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['showMe']>>>
    }
  }
  'users.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/profile/me'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'lessons.completed': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/lessons/completed'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['completed']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['completed']>>>
    }
  }
  'lessons.ongoing': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/lessons/ongoing'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['ongoing']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['ongoing']>>>
    }
  }
  'lessons.status': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/lessons/:lessonId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { lessonId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['status']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['status']>>>
    }
  }
  'lessons.subscribe': {
    methods: ["POST"]
    pattern: '/api/v1/profile/me/lessons/:lessonId/subscribe'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { lessonId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['subscribe']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['subscribe']>>>
    }
  }
  'lessons.unsubscribe': {
    methods: ["DELETE"]
    pattern: '/api/v1/profile/me/lessons/:lessonId/unsubscribe'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { lessonId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['unsubscribe']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/lessons_controller').default['unsubscribe']>>>
    }
  }
  'friends.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/friends'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['index']>>>
    }
  }
  'friends.pending_requests': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/friends/requests'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['pendingRequests']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['pendingRequests']>>>
    }
  }
  'friends.sent_requests': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/friends/requests/sent'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['sentRequests']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['sentRequests']>>>
    }
  }
  'friends.send_request': {
    methods: ["POST"]
    pattern: '/api/v1/profile/me/friends/requests/:friendId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { friendId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['sendRequest']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['sendRequest']>>>
    }
  }
  'friends.cancel_request': {
    methods: ["DELETE"]
    pattern: '/api/v1/profile/me/friends/requests/:friendId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { friendId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['cancelRequest']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['cancelRequest']>>>
    }
  }
  'friends.get_status': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/me/friends/:friendId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { friendId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['getStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['getStatus']>>>
    }
  }
  'friends.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/profile/me/friends/:friendId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { friendId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['destroy']>>>
    }
  }
  'friends.accept_request': {
    methods: ["PATCH"]
    pattern: '/api/v1/profile/me/friends/requests/:askingId/accept'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { askingId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['acceptRequest']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['acceptRequest']>>>
    }
  }
  'friends.decline_request': {
    methods: ["PATCH"]
    pattern: '/api/v1/profile/me/friends/requests/:askingId/decline'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { askingId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['declineRequest']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/friends_controller').default['declineRequest']>>>
    }
  }
  'users.search': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/user').searchUsersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['search']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.show_by_username': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/u/:username'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { username: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['showByUsername']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['showByUsername']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.get_avatar': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/:id/avatar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['getAvatar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['getAvatar']>>>
    }
  }
  'users.get_background': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/:id/background'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['getBackground']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['getBackground']>>>
    }
  }
  'users.username_available': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile/username/available'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['usernameAvailable']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['usernameAvailable']>>>
    }
  }
}
