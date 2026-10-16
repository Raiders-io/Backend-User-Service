import Friendship from '#models/friendship'
import { FriendshipStatus, type RelationshipStatus } from '#constants/friendship_status'
import {
  CannotFriendSelfException,
  FriendRequestAlreadyPendingException,
  AlreadyFriendsException,
  FriendshipNotFoundException,
} from '#exceptions/friendships_exception'

export class FriendshipService {
  async getStatus(userId: string, targetId: string): Promise<RelationshipStatus> {
    if (userId === targetId) return 'self'

    const relation = await this.findRelation(userId, targetId)
    if (!relation) return 'none'

    switch (relation.status) {
      case FriendshipStatus.ACCEPTED:
        return 'friends'
      case FriendshipStatus.PENDING:
        return relation.userId === userId ? 'pending_sent' : 'pending_received'
      default:
        return 'none'
    }
  }

  async sendRequest(userId: string, friendId: string) {
    if (userId === friendId) throw new CannotFriendSelfException()

    const existing = await this.findRelation(userId, friendId)
    if (existing) return this.resolveExisting(existing, userId)

    return Friendship.create({ userId, friendId, status: FriendshipStatus.PENDING })
  }

  private async resolveExisting(existing: Friendship, userId: string) {
    if (existing.status === FriendshipStatus.ACCEPTED) throw new AlreadyFriendsException()
    if (existing.userId === userId) throw new FriendRequestAlreadyPendingException()

    existing.status = FriendshipStatus.ACCEPTED
    await existing.save()
    return existing
  }

  async acceptRequest(currentUserId: string, requesterId: string) {
    const friendship = await this.findPending(requesterId, currentUserId)
    friendship.status = FriendshipStatus.ACCEPTED
    await friendship.save()
    return friendship
  }

  async declineRequest(currentUserId: string, requesterId: string) {
    const request = await this.findPending(requesterId, currentUserId)
    await request.delete()
  }

  async cancelRequest(currentUserId: string, targetId: string) {
    const request = await this.findPending(currentUserId, targetId)
    await request.delete()
  }

  private async findPending(senderId: string, receiverId: string) {
    const friendship = await Friendship.query()
      .where('user_id', senderId)
      .where('friend_id', receiverId)
      .where('status', FriendshipStatus.PENDING)
      .first()

    if (!friendship) throw new FriendshipNotFoundException()
    return friendship
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

export default new FriendshipService()
