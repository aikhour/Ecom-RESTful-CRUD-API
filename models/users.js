const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
    
    /**  
    * POST Creates a new user record
    * @param {Object}   data [User data]
    * @returns {Object|null}  [User record created]
    */
   async createUser(data) {
    try {
        // SQL statement - using pg promise helper
        const statement = pgp.helpers.insert(data, null, 'users') + "RETURNING *";

        // Executes statement
        const result = await db.query(statement);

        // returns record if successful
        if(result.rows?.length) {
            return result.rows[0];
        }
        // returns null if unsuccessful
        return null;

    } catch(error) {
        throw new Error(error);
    }

    }


    /**
     * Updates a user record
     * @param {Object} data [User data]
     * @returns {Object|null} [User record created]
     */
    async updateUser(data) {
        try {  
        // extract id and params from data
        const { id, ...params } = data;

        // Generate SQL statements - pgp helper funcs
        // condition for change
        const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
        // change all but user id
        const statement = pgp.helpers.update(params, null, 'users') + condition;
        
        // execute statement
        const result = await db.query(statement);

        // if successful
        if(result.rows?.length) {
            return result.rows[0];
        }

        // if not succcessful
        return null;        

        } catch(error) {
            throw new Error(error);
        }
    }

    /**
     * Get user record by email
     * @param {Object} email [User email]
     * @returns {Object|null} [User record]
     */
    async getUserByEmail(email) {
        
    }







}