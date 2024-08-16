"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.query = exports.connectDB = exports.client = void 0;
const pg_1 = require("pg");
require("dotenv/config");
exports.client = new pg_1.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432')
});
const connectDB = async () => {
    try {
        await exports.client.connect();
        console.log("Connected to the DB successfully");
    }
    catch (error) {
        console.error("failed to connect to the DB", error);
    }
};
exports.connectDB = connectDB;
console.log("test");
//this is a sql abstraction to execute sql queries - the arguments are the sql query text itself and any optional paramaters 
const query = async (text, params) => {
    try {
        const res = await exports.client.query(text, params);
        return res;
    }
    catch (error) {
        console.error('Error running query:', error);
    }
};
exports.query = query;
const disconnectDB = async () => {
    try {
        await exports.client.end();
        console.log("Disconnected from the database");
    }
    catch (error) {
        console.error("Failed to disconnect from the DB", error);
    }
};
exports.disconnectDB = disconnectDB;
