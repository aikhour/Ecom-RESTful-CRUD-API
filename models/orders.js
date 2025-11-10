const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderModel {
    
    /**  
    * POST Creates a new order record
    * @param {Object}   data [order data]
    * @returns {Object|null}  [order record created]
    */
   async createOrder(data) {
    try {
        // SQL statement - using pg promise helper
        const statement = pgp.helpers.insert(data, null, 'order_table') + "RETURNING *";

        // Executes statement
        const result = await db.query(statement);

        // returns record if successful
        if(result.rows?.length) {
            return {
                message: `Order for user: [${data.user_id}] created.`,
                record: result.rows[0]
            }
        }
        // returns null if unsuccessful
        return null;

    } catch(error) {
        throw new Error(error);
    }

    }


    /**
     * PUT Updates an order
     * @param {Object} data [order data]
     * @returns {Object|null} [order record created]
     */
    async updateOrder(data) {
        try {  
        // extract id and params from data
        const { id, ...params } = data;

        // Generate SQL statements - pgp helper funcs
        // condition for change
        const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
        // change all but order id
        const statement = pgp.helpers.update(params, null, 'order_table') + condition;
        
        // execute statement
        const result = await db.query(statement);

        // if successful
        if(result.rows?.length) {
            return {
                message: `Order for user: [${params.user_id}] updated.`,
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
     * GET Get order record by id
     * @param {Integer} id [Order ID]
     * @return {Object|null} [Order Record]
     */
    async getOrderById(id) {
        try {
            // generate sql statement
            const statement = `SELECT * FROM order_table WHERE id = $1`;
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
     * GET Get all orders
     * @return {Object|null} [First 10 Order Records]
     */
    async getAllOrders() {
        try {
            // generate sql statement
            const statement = `SELECT * FROM order_table LIMIT 10`;

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
     * DELETE delete order by id
     * @params {Integer} id [Order id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteOrder(id) {
        try {

            // generate sql statement
            const statement = `DELETE FROM order_table WHERE id = $1`;
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