import { pool } from '../db'

export class UserRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users')
    return rows
  }

  static async findOne(id: number) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    return rows[0]
  }

  static async create({
    username,
    name,
    email,
    password,
  }: {
    username: string
    name: string
    email: string
    password: string
  }) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, name, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
      [username, name, email, password]
    )
    return rows[0]
  }

  static async update({
    id,
    username,
    name,
    email,
    gender,
  }: {
    id: number
    username: string
    name: string
    email: string
    gender: 'M' | 'F'
  }) {
    const { rows } = await pool.query(
      `UPDATE users SET username = $1, name = $2, email = $3, gender = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`,
      [username, name, email, gender, id]
    )
    return rows[0]
  }

  static async delete(id: number) {
    const { rows } = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return rows[0]
  }
}
