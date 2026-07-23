import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { read } from 'node:fs'

export default class UserController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    const payload = await request.validateUsing(createUserValidator)

    const user = await User.create({
      ...payload,
      id: userId,
    })

    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, request, response }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User profile not found' })
    }

    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const userId = request.ctx?.userId || ''
    if (!userId || userId === '') throw new Error('User ID not found in context')

    if (userId !== params.id) {
      return response.forbidden({ message: 'Not your profile' })
    }
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User profile not found' })
    }

    const payload = await request.validateUsing(updateUserValidator)

    user.merge(payload)
    await user.save()
    return user
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
