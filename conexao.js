const sql = require('mssql');
const connStr = "Server=kasrvdb01; Database=DB_Site; User Id=sa; Password=K@lunga;";

const pool1 = new sql.ConnectionPool(connStr);
const pool1Connect = pool1.connect();

exports.executeQuery = async (query) => {
    await pool1Connect; // ensures that the pool has been created
    try {
        const request = pool1.request(); // or: new sql.Request(pool1)
        return await request.query(query);
    } catch (err) {
        console.error('SQL error', err);
    }
};