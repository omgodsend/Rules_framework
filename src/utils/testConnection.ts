// Import dotenv for environment variable management
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// Import the database client and query function from your 'db' module
import { client, query } from './db';

async function testDatabaseConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to the database.');
        const res = await client.query('SELECT NOW() as now');
        console.log('Current time from PostgreSQL:', res.rows[0].now);
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    } finally {
        await client.end();
    }
}

if (require.main === module) {
    testDatabaseConnection().then(() => client.end());
}