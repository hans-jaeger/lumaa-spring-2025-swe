/**
 * The purpose of this file is to establish a connection for the database using pg's Pool connection to PostgresSQL and export pg for later use. 
 * 
 */

// Import pg module
const { Pool } = require('pg');

// Create a connection based on the process.env.DATABASE_URL which comes from .env 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the pool module as we will use the sql queries in other files. 
module.exports = pool;
