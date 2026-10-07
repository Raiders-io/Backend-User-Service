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
            router.get('/', [controllers.Users, 'showMe'])
            router.patch('/', [controllers.Users, 'update'])
            router.get('/lessons/completed', [controllers.Lessons, 'completed'])
            router.get('/lessons/ongoing', [controllers.Lessons, 'ongoing'])
            router
              .group(() => {
                router.get('/lessons/:lessonId', [controllers.Lessons, 'status'])
                router.post('/lessons/:lessonId/subscribe', [controllers.Lessons, 'subscribe'])
                router.delete('/lessons/:lessonId/unsubscribe', [
                  controllers.Lessons,
                  'unsubscribe',
                ])
              })
              .where('lessonId', router.matchers.uuid())
          })
          .prefix('/me')
          .use(middleware.auth())
        router.get('/search', [controllers.Users, 'search']).use(searchThrottle)
        router.get('/:id', [controllers.Users, 'show']).where('id', router.matchers.uuid())
        router
          .get('/:id/avatar', [controllers.Users, 'getAvatar'])
          .where('id', router.matchers.uuid())
      })
      .prefix('/profile')

    router
      .group(() => {
        router.get('/', [controllers.Friends, 'index'])
        router.get('/requests', [controllers.Friends, 'pendingRequests'])
        router.get('/requests/sent', [controllers.Friends, 'sentRequests'])

        router
          .group(() => {
            router.post('/requests/:friendId', [controllers.Friends, 'sendRequest'])
            router.delete('/requests/:friendId', [controllers.Friends, 'cancelRequest'])
            router.delete('/:friendId', [controllers.Friends, 'destroy'])
          })
          .where('friendId', router.matchers.uuid())

        router
          .group(() => {
            router.patch('/requests/:askingId/accept', [controllers.Friends, 'acceptRequest'])
            router.patch('/requests/:askingId/decline', [controllers.Friends, 'declineRequest'])
          })
          .where('askingId', router.matchers.uuid())
      })
      .prefix('/friends/me')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
