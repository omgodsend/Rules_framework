import { Client } from 'pg';
import 'dotenv/config';

export const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432')
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to the DB successfully");
    } catch (error) {
        console.error("failed to connect to the DB", error);
    }
}


//this is a sql abstraction to execute sql queries - the arguments are the sql query text itself and any optional paramaters 

export const query = async (text:string, params?: any[]) => {
    try {
        const res = await client.query(text, params);
        return res;
    } catch (error) {
        console.error('Error running query:', error);
    }
    }

export const disconnectDB = async () => {
    try {
        await client.end();
        console.log("Disconnected from the database");
    } catch (error) {
        console.error ("Failed to disconnect from the DB", error);
    }
}