const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

    /**
     * POST Create new cart record
     * @params {Object} data [Cart record]
     * @return {Object|null} [Created cart]
     */
    async createCart(data) {
        try {
            const { id } = data;


            // generate create record statement
            const statement = pgp.helpers.insert(data, null, 'cart_table') + `RETURNING *`;
            // execute statement
            const result = await db.query(statement);

            // return result if successful
            if(result.rows?.length) {
                return {
                    message: `Cart created with id: ${id}`,
                    record: result.rows[0]
                }
            }
            
            // returns null if unsuccessful
            return null

        } catch(error) {
            throw new Error(error);
        }


    }

    /**
    * PUT Updates a cart record
     * @param {Object} data [cart data]
     * @returns {Object|null} [cart record updated]
     */
    async updateCart(data) {
    try {  
    // extract id and params from data
    const { id, ...params } = data;
    
    // Generate SQL statements - pgp helper funcs
    // condition for change
    const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
    // change all but user id
    const statement = pgp.helpers.update(params, null, 'cart_table') + condition;
            
    // execute statement
    const result = await db.query(statement);
    
    // if successful
    if(result.rows?.length) {
        return {
            message: `Cart with id: ${id} updated.`,
            record: result.rows[0]
        }
    }
    
    // if not succcessful
    return null;        
    
    } catch(error) {
        throw new Error(error);
    }
    }

    /**
     * GET Get all carts
     * @return {Object|null} [First 10 cart records]
     */
    async getAllCarts() {
        try {
            // generate sql statement
            const statement = `SELECT * FROM cart_table LIMIT 10`;

            // execute sql statement
            const result = await db.query(statement);

            // if success
            if(result.rows?.length) {
                return result.rows;
            }
            // if unsuccessful
            return null;

        } catch(error) {
            throw new Error(error);
        }
    }
    
    /**
     * GET Get cart record by id
     * @param {Integer} id [cart ID]
     * @return {Object|null} [cart Record]
     */
    async getCartById(id) {
        try {
            // generate sql statement
            const statement = `SELECT * FROM cart_table WHERE id = $1`;
            const values = [id];

            // execute sql statement
            const result = await db.query(statement, values);

            // if success
            if (result.rows?.length) {
                return result.rows[0];
            }
            // if unsuccessful
            return null;


        } catch(error) {
            throw new Error(error);
        }
    }

    /**
     * GET Get cart record by username
     * @param {String} username [cart username]
     * @return {Object|null} [cart Record]
     */
    async getCartById(username) {
        try {
            // generate sql statement
            const statement = `SELECT * FROM cart_table WHERE username = $1`;
            const values = [username];

            // execute sql statement
            const result = await db.query(statement, values);

            // if success
            if (result.rows?.length) {
                return result.rows[0];
            }
            // if unsuccessful
            return null;


        } catch(error) {
            throw new Error(error);
        }
    }   
    
    /**
     * DELETE delete cart by id
     * @params {Integer} id [cart id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteCart(id) {
        try {

            // generate sql statement
            const statement = `DELETE FROM cart_table WHERE id = $1`;
            const values = [id];

            // execute statement
            const result = await db.query(statement, values);

            // if success
            if(result.rows?.length) {
                return result.rows[0];
            }
            // if unsuccessful
            return null;

        } catch(error) {
            throw new Error(error);
        }
    }   

}