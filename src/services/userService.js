import pool from '../config/dbConnect.js';

export async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT id, nome, email, password FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

export async function createUser(nome, email, password) {
  const result = await pool.query(
    `
    INSERT INTO users (nome, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
    `,
    [nome, email, password]
  );
  return result.rows[0];
}