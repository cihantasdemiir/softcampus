const { Pool } = require('pg');

// PostgreSQL bağlantı havuzu
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'softcampus ',
    password: '165516',
    port: 5432
});

module.exports = pool;