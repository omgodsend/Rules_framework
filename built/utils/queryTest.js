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
// Import necessary modules
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Make sure your .env file is configured correctly with your database credentials
// Import your database client and query function
const db_1 = require("./db");
// Function to fetch and log all rules from the database
async function fetchAllRules() {
    try {
        await db_1.client.connect();
        console.log('Connected successfully to the database.');
        // Query to select all rules
        const result = await (0, db_1.query)('SELECT * FROM rules where evaluation = $1 and enabled = false', ['budget']);
        console.log('All rules:', result.rows);
        return result.rows; // This returns the rows in case you need to do something with them later
    }
    catch (error) {
        console.error('Error fetching rules:', error);
        return [];
    }
    finally {
        await (0, db_1.disconnectDB)();
        console.log('Disconnected from the database.');
    }
}
// Execute the function
fetchAllRules();
