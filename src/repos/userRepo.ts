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

  static async create({ username, name, email, password }) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, name, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
      [username, name, email, password]
    )
    return rows[0]
  }

  static async update({ id, username, name, email }) {
    const { rows } = await pool.query(
      `UPDATE users SET username = $1, name = $2, email = $3 WHERE id = $4 RETURNING *`,
      [username, name, email, id]
    )
    return rows[0]
  }

  static async delete(id: number) {
    const { rows } = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return rows[0]
  }
}
