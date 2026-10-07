/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { searchThrottle } from './limiter.ts'

import { controllers } from '#generated/controllers'

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.get('/me', [controllers.Users, 'showMe'])
            router.patch('/me', [controllers.Users, 'update'])
            router.get('/me/lessons/completed', [controllers.Lessons, 'completed'])
            router.get('/me/lessons/ongoing', [controllers.Lessons, 'ongoing'])
          })
          .use(middleware.auth())
        router.get('/search', [controllers.Users, 'search']).use(searchThrottle)
        router.get('/:id', [controllers.Users, 'show'])
        router.get('/:id/avatar', [controllers.Users, 'getAvatar'])
      })
      .prefix('/profile')

    router
      .group(() => {
        router.get('/', [controllers.Friends, 'index'])
        router.get('/requests', [controllers.Friends, 'pendingRequests'])
        router.get('/requests/sent', [controllers.Friends, 'sentRequests'])
        router.post('/requests/:friendId', [controllers.Friends, 'sendRequest'])
        router.delete('/requests/:friendId', [controllers.Friends, 'cancelRequest'])
        router.patch('/requests/:askingId/accept', [controllers.Friends, 'acceptRequest'])
        router.patch('/requests/:askingId/decline', [controllers.Friends, 'declineRequest'])
        router.delete('/:friendId', [controllers.Friends, 'destroy'])
      })
      .prefix('/friends/me')
      .use(middleware.auth())
  })
  .prefix('/api/v1/')
