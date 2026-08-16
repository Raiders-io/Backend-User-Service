import Friendship from '#models/friendship'
import { FriendshipStatus } from '#constants/friendship_status'
import {
  CannotFriendSelfException,
  FriendRequestAlreadyPendingException,
  AlreadyFriendsException,
  FriendshipNotFoundException,
} from '#exceptions/friendships_exception'

export class FriendshipService {
  async sendRequest(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new CannotFriendSelfException()
    }

    const existing = await this.findRelation(userId, friendId)
    if (existing) {
      switch (existing.status) {
        case FriendshipStatus.PENDING:
          throw new FriendRequestAlreadyPendingException()
        case FriendshipStatus.ACCEPTED:
          throw new AlreadyFriendsException()
      }
    }

    return Friendship.create({
      userId,
      friendId,
      status: FriendshipStatus.PENDING,
    })
  }

  async acceptRequest(userId: string, friendId: string) {
    const friendship = await Friendship.query()
      .where('user_id', userId)
      .where('friend_id', friendId)
      .where('status', FriendshipStatus.PENDING)
      .firstOrFail()

    friendship.status = FriendshipStatus.ACCEPTED
    await friendship.save()

    return friendship
  }

  async declineRequest(currentUserId: string, requesterId: string) {
    const friendship = await Friendship.query()
      .where('user_id', requesterId)
      .where('friend_id', currentUserId)
      .where('status', FriendshipStatus.PENDING)
      .firstOrFail()

    await friendship.delete()
  }

  async cancelRequest(currentUserId: string, targetId: string) {
    const friendship = await Friendship.query()
      .where('user_id', currentUserId)
      .where('friend_id', targetId)
      .where('status', FriendshipStatus.PENDING)
      .firstOrFail()

    await friendship.delete()
  }

  async unfriend(userId: string, friendId: string) {
    const friendship = await this.findRelation(userId, friendId)

    if (!friendship || friendship.status !== FriendshipStatus.ACCEPTED) {
      throw new FriendshipNotFoundException()
    }

    await friendship.delete()
  }

  async getFriends(userId: string) {
    const friendships = await Friendship.query()
      .where('status', FriendshipStatus.ACCEPTED)
      .where((query) => {
        query.where('user_id', userId).orWhere('friend_id', userId)
      })
      .preload('user')
      .preload('friend')

    return friendships.map((f) => (f.userId === userId ? f.friend : f.user))
  }

  async getReceivedRequests(userId: string) {
    return Friendship.query()
      .where('friend_id', userId)
      .where('status', FriendshipStatus.PENDING)
      .preload('user')
  }

  async getSentRequests(userId: string) {
    return Friendship.query()
      .where('user_id', userId)
      .where('status', FriendshipStatus.PENDING)
      .preload('friend')
  }

  private async findRelation(userId: string, friendId: string) {
    return Friendship.query()
      .where((query) => {
        query.where('user_id', userId).where('friend_id', friendId)
      })
      .orWhere((query) => {
        query.where('user_id', friendId).where('friend_id', userId)
      })
      .first()
  }
}
