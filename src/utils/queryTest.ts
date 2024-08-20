// Import necessary modules
import * as dotenv from 'dotenv';
dotenv.config(); 

// Import your database client and query function
import { client, disconnectDB, query } from './db';

async function fetchAllRules() {
    try {
        await client.connect();
        console.log('Connected successfully to the database.');

        const result = await query('SELECT * FROM rules where evaluation = $1 and enabled = false', ['budget']);
        console.log('All rules:', result.rows);

        return result.rows;  
    } catch (error) {
        console.error('Error fetching rules:', error);
        return [];
    } finally {
        await disconnectDB();
    }
}

fetchAllRules();