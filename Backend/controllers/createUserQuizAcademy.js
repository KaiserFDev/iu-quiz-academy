const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const username = 'AlbertF';
const password = 'Start12345';
const admin = false;

async function createUser() {
  const hashedPassword = await bcrypt.hash(password, 10);

  const pool = new Pool({
    //PostgreSQL-Verbindungsdaten
    user: 'iuquizdb_user',
    host: 'dpg-d2j1gp6mcj7s73eh7t0g-a.frankfurt-postgres.render.com',
    database: 'iuquizdb',
    password: 'YYXvZo0S4cxTbAsLnZD1cn6bfjtDil8J',
    port: 5432,
  });

  await pool.query(
    'INSERT INTO "user" (username, password_hash, created_at, admin) VALUES ($1, $2, NOW(), $3)',
    [username, hashedPassword, admin]
  );

  await pool.end();
  console.log('User erfolgreich angelegt!');
}

createUser();