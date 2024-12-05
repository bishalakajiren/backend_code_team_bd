const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Add port configuration if necessary
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    debug: false
  });
  



const connect = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log("MySQL connected.", connection.threadId);
        return connection;
    } catch (error) {
        console.log(error);
    }
};

console.log(connect, 'pool');
module.exports = pool;
