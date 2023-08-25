// import mysql2 from 'mysql2';

// const options = {
//   host: 'gridlog-db-sql.chkylk9p7xxu.us-west-2.rds.amazonaws.com',
//   user: 'gridlog',
//   password: 'gridlogdb1999',
//   database: 'gdb',
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// };

// export const connectToMySQL = () => {
//   const connection = mysql2.createPool(options);
//   try {
//     console.log('SQL Connection Successful');
//     return connection;
//   } catch (err) {
//     console.error('SQL Connection Error:', err);
//     return connection;
//   } finally {
//     // connection.end();
//     return connection;
//   }
// };

// export default mysql2;



