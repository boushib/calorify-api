import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  updateUser,
} from '../controllers'

export const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/users').get(getUsers).post(createUser)
userRouter.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)
