import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    CREATE TYPE UserRole AS ENUM ('USER', 'ADMIN');
    CREATE TYPE UserGender AS ENUM ('M', 'F');

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      gender UserGender NOT NULL DEFAULT 'M',
      role UserRole NOT NULL DEFAULT 'USER',
      daily_calory_threshold INT NOT NULL DEFAULT 2500,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export const down = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.sql(`
    DROP TABLE users;
    DROP TYPE UserGender;
    DROP TYPE UserRole;
  `)
}
