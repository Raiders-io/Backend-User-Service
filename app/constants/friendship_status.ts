export enum FriendshipStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
}

export type RelationshipStatus = 'self' | 'none' | 'friends' | 'pending_sent' | 'pending_received'
