// "use strict";
//  import 'dotenv/config'; 
//  import { client, query } from './db'; 
// async function testDatabaseConnection() {
//      try {
//          await client.connect();
//          console.log('Connected successfully to the database.');
//          const res = await client.query('SELECT NOW() as now');
//          console.log('Current time from PostgreSQL:', res.rows[0].now);
//      } catch (err) {
//          console.error('Failed to connect to the database:', err);
//      } finally {
//          await client.end();
//      }
//  }
//  if (require.main === module) {
//      testDatabaseConnection().then(() => client.end());
//  }
//  testDatabaseConnection();
