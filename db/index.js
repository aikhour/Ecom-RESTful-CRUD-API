// connect express server to postgreSQL

const { Pool } = require('pg');
const { DB } = require('../config');

const pool = new Pool({
    user: DB.PGUSER,
    password: DB.PGDATABASE,
    host: DB.PGHOST,
    database: DB.PGDATABASE,
    port: DB.PGPORT
});

module.exports = {
    query: (text, params) => pool.query(text, params);
}