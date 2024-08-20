import { connectDB, query, disconnectDB } from '../utils/db';
import { Rule } from '../utils/types';

export const handler = async (event: any) => {
    console.log("Received event:", event);

    await connectDB(); // Ensure the database is connected before running the query

    try {
        const result = await query('SELECT * FROM rules', []);
        await disconnectDB(); // Disconnect from the database after the query is executed

        if (result && result.rows) {
            console.log("Rules found:", result.rows);
            return {
                statusCode: 200,
                body: JSON.stringify(result.rows)
            };
        } else {
            console.log('No rules found or query returned undefined.');
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No rules found' })
            };
        }
    } catch (error) {
        console.error('Error running query:', error);
        await disconnectDB(); // Ensure to disconnect in case of error
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};