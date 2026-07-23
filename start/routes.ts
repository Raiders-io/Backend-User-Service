/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const FriendsController = () => import('#controllers/friends_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/me', [UsersController, 'showMe'])
    router.patch('/me', [UsersController, 'update'])
    router.delete('/me', [UsersController, 'destroy'])
    router.get('/:id', [UsersController, 'show'])
  })
  .prefix('/profile')

router
  .group(() => {
    router.get('/', [FriendsController, 'index'])
    router.get('/requests', [FriendsController, 'pendingRequests'])
    router.get('/requests/sent', [FriendsController, 'sentRequests'])
    router.post('/requests/:friendId', [FriendsController, 'sendRequest'])
    router.delete('/requests/:friendId', [FriendsController, 'cancelRequest'])
    router.patch('/requests/:askingId/accept', [FriendsController, 'acceptRequest'])
    router.patch('/requests/:askingId/decline', [FriendsController, 'declineRequest'])
    router.delete('/:friendId', [FriendsController, 'destroy'])
  })
  .prefix('/friends/me')
