import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'users.show_me': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple?: []; params?: {} }
    'lessons.completed': { paramsTuple?: []; params?: {} }
    'lessons.ongoing': { paramsTuple?: []; params?: {} }
    'lessons.status': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'lessons.subscribe': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'lessons.unsubscribe': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'friends.index': { paramsTuple?: []; params?: {} }
    'friends.pending_requests': { paramsTuple?: []; params?: {} }
    'friends.sent_requests': { paramsTuple?: []; params?: {} }
    'friends.send_request': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'friends.cancel_request': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'friends.get_status': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'friends.destroy': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'friends.accept_request': { paramsTuple: [ParamValue]; params: {'askingId': ParamValue} }
    'friends.decline_request': { paramsTuple: [ParamValue]; params: {'askingId': ParamValue} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show_by_username': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_avatar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_background': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.username_available': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'users.show_me': { paramsTuple?: []; params?: {} }
    'lessons.completed': { paramsTuple?: []; params?: {} }
    'lessons.ongoing': { paramsTuple?: []; params?: {} }
    'lessons.status': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'friends.index': { paramsTuple?: []; params?: {} }
    'friends.pending_requests': { paramsTuple?: []; params?: {} }
    'friends.sent_requests': { paramsTuple?: []; params?: {} }
    'friends.get_status': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show_by_username': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_avatar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_background': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.username_available': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'users.show_me': { paramsTuple?: []; params?: {} }
    'lessons.completed': { paramsTuple?: []; params?: {} }
    'lessons.ongoing': { paramsTuple?: []; params?: {} }
    'lessons.status': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'friends.index': { paramsTuple?: []; params?: {} }
    'friends.pending_requests': { paramsTuple?: []; params?: {} }
    'friends.sent_requests': { paramsTuple?: []; params?: {} }
    'friends.get_status': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show_by_username': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_avatar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.get_background': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.username_available': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'users.update': { paramsTuple?: []; params?: {} }
    'friends.accept_request': { paramsTuple: [ParamValue]; params: {'askingId': ParamValue} }
    'friends.decline_request': { paramsTuple: [ParamValue]; params: {'askingId': ParamValue} }
  }
  POST: {
    'lessons.subscribe': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'friends.send_request': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
  }
  DELETE: {
    'lessons.unsubscribe': { paramsTuple: [ParamValue]; params: {'lessonId': ParamValue} }
    'friends.cancel_request': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
    'friends.destroy': { paramsTuple: [ParamValue]; params: {'friendId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}