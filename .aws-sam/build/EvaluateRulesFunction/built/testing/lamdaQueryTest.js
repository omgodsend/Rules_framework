"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const db_1 = require("../utils/db");
const handler = async (event) => {
    console.log("Received event:", event);
    await (0, db_1.connectDB)();
    try {
        const result = await (0, db_1.query)('SELECT * FROM rules', []);
        await (0, db_1.disconnectDB)();
        if (result && result.rows) {
            console.log("Rules found:", result.rows);
            return {
                statusCode: 200,
                body: JSON.stringify(result.rows)
            };
        }
        else {
            console.log('No rules found or query returned undefined.');
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No rules found' })
            };
        }
    }
    catch (error) {
        console.error('Error running query:', error);
        await (0, db_1.disconnectDB)();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
exports.handler = handler;
