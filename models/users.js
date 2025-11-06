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
     * PUT Updates a user record
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
     * GET Get user record by email
     * @param {String} email [User email]
     * @returns {Object|null} [User record]
     */
    async getUserByEmail(email) {
        try {
            // generate SQL statement
            const statement = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            // execute sql statement
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

    /**
     * GET Get user record by id
     * @param {Integer} id [User ID]
     * @return {Object|null} [User Record]
     */
    async getUserById(id) {
        try {
            // generate sql statement
            const statement = `SELECT * FROM users WHERE id = $1`;
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
     * GET Get all users
     * @return {Object|null} [First 10 User Records]
     */
    async getAllUsers() {
        try {
            // generate sql statement
            const statement = `SELECT * FROM users LIMIT 10`;

            // execute sql statement
            const result = await db.query(statement);

            // if success
            if(result.rows?.length) {
                return result.rows[0, 10];
            }
            // if unsuccessful
            return null;

        } catch(error) {
            throw new Error(error);
        }
    }


    /**
     * DELETE delete user by id
     * @params {Integer} id [User id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteUser(id) {
        try {

            // generate sql statement
            const statement = `DELETE FROM users WHERE id = $1`;
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