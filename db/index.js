// connect express server to postgreSQL
"use strict";

const { Pool } = require('pg');
const { DB } = require('../config');

const pool = new Pool({
    user: DB.PGUSER,
    password: DB.PGPASSWORD,
    host: DB.PGHOST,
    database: DB.PGDATABASE,
    port: DB.PGPORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}