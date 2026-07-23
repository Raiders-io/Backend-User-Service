import { FriendshipService } from '#services/friendship_service'
import { getUserId } from '#services/utils_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class FriendsController {
  constructor(private friendshipService: FriendshipService) {}

  async index(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return this.friendshipService.getFriends(userId)
  }

  async pendingRequests(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return this.friendshipService.getReceivedRequests(userId)
  }

  async sentRequests(ctx: HttpContext) {
    const userId = getUserId(ctx)

    return this.friendshipService.getSentRequests(userId)
  }

  async sendRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return this.friendshipService.sendRequest(userId, params.friendId)
  }

  async cancelRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return this.friendshipService.cancelRequest(userId, params.friendId)
  }

  async acceptRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return this.friendshipService.acceptRequest(userId, params.askingId)
  }

  async declineRequest(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return this.friendshipService.declineRequest(userId, params.askingId)
  }

  async destroy(ctx: HttpContext) {
    const { params } = ctx
    const userId = getUserId(ctx)

    return this.friendshipService.unfriend(userId, params.friendId)
  }
}
