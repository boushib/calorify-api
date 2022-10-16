import { Request, Response } from 'express'
import { pool } from '../db'

export const login = async (req: Request, res: Response) => {
  return res.json({ message: 'Login' })
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users`)
    return res
      .status(200)
      .json(rows.map(user => ({ ...user, password: undefined })))
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return res.status(200).json(rows[0])
  } catch (err) {
    console.log(err)
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body

  try {
    const { rows } = await pool.query(
      `INSERT INTO users (username, name, email, password) VALUES($1, $2, $3, $4)`,
      [username, name, email, password]
    )
    return res.status(201).json({ user: rows[0] })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { username, name, email } = req.body

  try {
    const { rows } = await pool.query(
      `UPDATE users SET username = $1, name = $2, email = $3 WHERE id = $4 RETURNING *`,
      [username, name, email, id]
    )
    return res.status(200).json({ user: rows[0] })
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.log(err)
  }
}
