/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { searchThrottle } from './limiter.ts'
import { controllers } from '#generated/controllers'

const uuid = router.matchers.uuid()

router
  .group(() => {
    router
      .group(() => {
        /* ----------------------------- Me (auth) ----------------------------- */
        router
          .group(() => {
            router.get('/', [controllers.Users, 'showMe'])
            router.patch('/', [controllers.Users, 'update'])

            // Lessons
            router.get('/lessons/completed', [controllers.Lessons, 'completed'])
            router.get('/lessons/ongoing', [controllers.Lessons, 'ongoing'])
            router
              .group(() => {
                router.get('/:lessonId', [controllers.Lessons, 'status'])
                router.post('/:lessonId/subscribe', [controllers.Lessons, 'subscribe'])
                router.delete('/:lessonId/unsubscribe', [controllers.Lessons, 'unsubscribe'])
              })
              .prefix('/lessons')
              .where('lessonId', uuid)

            // Friends
            router
              .group(() => {
                router.get('/', [controllers.Friends, 'index'])
                router.get('/requests', [controllers.Friends, 'pendingRequests'])
                router.get('/requests/sent', [controllers.Friends, 'sentRequests'])

                router
                  .post('/requests/:friendId', [controllers.Friends, 'sendRequest'])
                  .where('friendId', uuid)
                router
                  .delete('/requests/:friendId', [controllers.Friends, 'cancelRequest'])
                  .where('friendId', uuid)
                router
                  .delete('/:friendId', [controllers.Friends, 'destroy'])
                  .where('friendId', uuid)

                router
                  .patch('/requests/:askingId/accept', [controllers.Friends, 'acceptRequest'])
                  .where('askingId', uuid)
                router
                  .patch('/requests/:askingId/decline', [controllers.Friends, 'declineRequest'])
                  .where('askingId', uuid)
              })
              .prefix('/friends')
          })
          .prefix('/me')
          .use(middleware.auth())

        /* ----------------------------- Public ----------------------------- */
        router.get('/search', [controllers.Users, 'search']).use(searchThrottle)
        router.get('/u/:username', [controllers.Users, 'showByUsername'])
        router.get('/:id', [controllers.Users, 'show']).where('id', uuid)
        router.get('/:id/avatar', [controllers.Users, 'getAvatar']).where('id', uuid)
        router.get('/:id/background', [controllers.Users, 'getBackground']).where('id', uuid)
        //router.get('/:id/friends', [controllers.Users, 'show']).where('id', uuid)
      })
      .prefix('/profile')
  })
  .prefix('/api/v1')
