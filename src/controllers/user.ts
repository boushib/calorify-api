import { Request, Response } from 'express'
import { UserRepo } from '../repos'

export const login = async (req: Request, res: Response) => {
  return res.json({ message: 'Login' })
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepo.find()
    return res
      .status(200)
      .json(users.map(user => ({ ...user, password: undefined })))
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const user = await UserRepo.findOne(id)
    return res.status(200).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body

  try {
    const user = await UserRepo.create({ username, name, email, password })
    return res.status(201).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { username, name, email } = req.body

  try {
    const user = await UserRepo.update({ id, username, name, email })
    return res.status(200).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const user = await UserRepo.delete(id)
    return res.status(200).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}
