import { Router } from 'express'
import { login } from '../controllers'

export const userRouter = Router()
userRouter.route('/login').post(login)
