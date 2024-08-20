"use strict";
// import { query } from '../utils/db';
// import { Rule } from '../utils/types';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// export const handler = async (event: any) => {
//     const body = JSON.parse(event.body);
//     const ruleType = event.ruleType; 
//     console.log('Rule Type:', ruleType);
//     const result = await query('SELECT * FROM rules WHERE rule_type = $1 AND enabled = true', [ruleType]);
//     if (result && result.rows) {
//         const rules: Rule[] = result.rows;
//         console.log('Rules:', JSON.stringify(rules))
//         return rules;
//     } else {
//         console.error('No rules found/undefined query');
//     }
//     return result;
// };
const db_1 = require("../utils/db");
const handler = async (event) => {
    console.log("Received event:", event);
    let eventData;
    try {
        eventData = JSON.parse(event.body).data;
    }
    catch (error) {
        console.error('Error parsing event body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Bad request: Invalid JSON in the request body' })
        };
    }
    // Assuming 'eventData' contains the keys matching the 'evaluation' column in your DB.
    const results = await Promise.all(Object.keys(eventData).map(async (key) => {
        return await (0, db_1.query)('SELECT * FROM rules WHERE evaluation = $1 AND enabled = true', [key]);
    }));
    // Explicitly type the accumulator as Rule[]
    const rules = results.reduce((acc, result) => {
        if (result && result.rows) {
            acc.push(...result.rows);
        }
        return acc;
    }, []);
    if (rules.length === 0) {
        console.error('No rules found or undefined query results');
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'No enabled rules found for given types' })
        };
    }
    console.log("Rules found:", rules);
    return {
        statusCode: 200,
        body: JSON.stringify(rules)
    };
};
exports.handler = handler;
