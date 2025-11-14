const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class DBHelper {

    // Counts unique ids in a given table - slower on larger tables
    async idCounter(table) {
        try {
            // generate statement
            const statement = `SELECT COUNT(*) FROM ${table}`;
            // execute statement
            const result = await db.query(statement);
            // if successful
            const number = await parseInt(result.rows[0].count)
            return number;
            
        
        } catch(error) {
            throw error;
        }
    }

    // Returns the next sequential unique id, for the given table
    async idMaker(table) {
        try {
            // run idCounter from above
            const result = await this.idCounter(table);
            // add one
            const newId = parseInt(result + 1);
            return newId;
            
        } catch(error) {
            throw error;
        }
    }

    // get current date
    async getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    // calculate order price
    async calcPrice(productId, quantity) {
        try {
            // statements
            const condition = await pgp.as.format(' WHERE id = ${productId}', {productId});
            const statement = `SELECT price FROM product_table` + condition;

            // execute statement
            const response = await db.query(statement);
            const price = response.rows[0].price;
            if(price) {
                // calculate total
                const total = price * quantity;
                return total;
            }
            
            // if no return
            return null;

        } catch(error) {
            throw error;
        }
        
       
    }
}