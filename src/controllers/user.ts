import { Request, Response } from 'express'
import { UserRepo } from '../repos'

export const login = async (req: Request, res: Response) => {
  res.json({ message: 'Login' })
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepo.find()
    res.status(200).json(users.map(user => ({ ...user, password: undefined })))
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const user = await UserRepo.findOne(id)

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ ...user, password: undefined })
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body

  try {
    const user = await UserRepo.create({ username, name, email, password })
    res.status(201).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { username, name, email, gender } = req.body

  try {
    const user = await UserRepo.update({ id, username, name, email, gender })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const user = await UserRepo.delete(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ ...user, password: undefined })
  } catch (err) {
    console.log(err)
  }
}
