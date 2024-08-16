"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const db_1 = require("../utils/db");
const handler = async (event) => {
    const ruleType = event.ruleType; // Passed by Step Function or triggering event
    const result = await (0, db_1.query)('SELECT * FROM rules WHERE rule_type = $1 AND enabled = true', [ruleType]);
    if (result && result.rows) {
        const rules = result.rows;
        return rules;
    }
    else {
        console.error('No rules found/undefined query');
    }
    return result;
};
exports.handler = handler;
