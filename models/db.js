const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class DBHelper {

    // Counts unique ids in a given table - slower on larger tables
    async idCounter(table) {
        try {
            // generate statement
            const statement = `SELECT COUNT(*) FROM ${table}`;
            // execute statement
            const result = db.query(statement);
            // if successful
            return result;

        } catch(error) {
            throw error;
        }
    }

    // Returns the next sequential unique id, for the given table
    async idMaker(table) {
        try {
            // run idCounter from above
            const result = this.idCounter();
            // add one
            const newId = result + 1;
            return newId;
            
        } catch(error) {
            throw error;
        }
    }
}