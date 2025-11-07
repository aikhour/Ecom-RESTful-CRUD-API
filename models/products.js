const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class ProductModel {

    /**
     * POST Create new product record
     * @params {Object} data [Product record]
     * @return {Object|null} [Created product]
     */
    async createProduct(data) {
        try {
            const { id } = data;


            // generate create record statement
            const statement = pgp.helpers.insert(data, null, 'product_table') + `RETURNING *`;
            // execute statement
            const result = await db.query(statement);

            // return result if successful
            if(result.rows?.length) {
                return {
                    message: `Product record created with id: ${id}`,
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
    * PUT Updates a product record
     * @param {Object} data [product data]
     * @returns {Object|null} [product record updated]
     */
    async updateProduct(data) {
    try {  
    // extract id and params from data
    const { id, ...params } = data;
    
    // Generate SQL statements - pgp helper funcs
    // condition for change
    const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
    // change all but user id
    const statement = pgp.helpers.update(params, null, 'product_table') + condition;
            
    // execute statement
    const result = await db.query(statement);
    
    // if successful
    if(result.rows?.length) {
        return {
            message: `Product record with id: ${id} updated.`,
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
     * GET Get all products
     * @return {Object|null} [First 10 product records]
     */
    async getAllProducts() {
        try {
            // generate sql statement
            const statement = `SELECT * FROM product_table LIMIT 10`;

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

}