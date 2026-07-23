import { Exception } from '@adonisjs/core/exceptions'

export class CannotFriendSelfException extends Exception {
  static status = 400
  static code = 'E_CANNOT_FRIEND_SELF'
  static message = 'You cannot send a friend request to yourself'
}

export class FriendRequestAlreadyPendingException extends Exception {
  static status = 409
  static code = 'E_FRIEND_REQUEST_ALREADY_PENDING'
  static message = 'A friend request is already pending'
}

export class AlreadyFriendsException extends Exception {
  static status = 409
  static code = 'E_ALREADY_FRIENDS'
  static message = 'You are already friends with this user'
}

export class FriendshipNotFoundException extends Exception {
  static status = 404
  static code = 'E_FRIENDSHIP_NOT_FOUND'
  static message = 'This friendship does not exist'
}

export class FriendRequestNotFoundException extends Exception {
  static status = 404
  static code = 'E_FRIEND_REQUEST_NOT_FOUND'
  static message = 'This friend request does not exist'
}
