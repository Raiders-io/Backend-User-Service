/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UserController = () => import('#controllers/user_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/me', [UserController, 'showMe'])
    router.patch('/me', [UserController, 'update'])
    router.delete('/me', [UserController, 'destroy'])
    router.get('/:id', [UserController, 'show'])
  })
  .prefix('/profile')
