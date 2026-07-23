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
    router.get('/', [FriendsController, 'indexMe'])
    router.post('/', [FriendsController, 'storeMe'])
    router.delete('/:friendId', [FriendsController, 'destroyMe'])
  })
  .prefix('/profile/me/friends')
