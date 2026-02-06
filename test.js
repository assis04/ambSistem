import pool from './src/config/dbConnect.js';



async function testConnection() {
  const result = await pool.query('SELECT NOW()');
  console.log(result.rows[0]);
}

testConnection();
