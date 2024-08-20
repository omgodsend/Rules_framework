"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dotenv for environment variable management
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './.env' });
// Import the database client and query function from your 'db' module
const db_1 = require("./db");
async function testDatabaseConnection() {
    try {
        await db_1.client.connect();
        console.log('Connected successfully to the database.');
        const res = await db_1.client.query('SELECT NOW() as now');
        console.log('Current time from PostgreSQL:', res.rows[0].now);
    }
    catch (err) {
        console.error('Failed to connect to the database:', err);
    }
    finally {
        await db_1.client.end();
    }
}
if (require.main === module) {
    testDatabaseConnection().then(() => db_1.client.end());
}
