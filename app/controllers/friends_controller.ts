import FriendshipService from '#services/friendship_service'
import { getUserId } from '#services/utils_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  async index(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return FriendshipService.getFriends(userId)
  }

  async pendingRequests(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return FriendshipService.getReceivedRequests(userId)
  }

  async sentRequests(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return FriendshipService.getSentRequests(userId)
  }

  async sendRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return FriendshipService.sendRequest(userId, params.friendId)
  }

  async cancelRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return FriendshipService.cancelRequest(userId, params.friendId)
  }

  async acceptRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return FriendshipService.acceptRequest(userId, params.askingId)
  }

  async declineRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return FriendshipService.declineRequest(userId, params.askingId)
  }

  async destroy(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return FriendshipService.unfriend(userId, params.friendId)
  }
}
