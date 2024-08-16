import { query } from '../utils/db';
import { Rule } from '../utils/types';

export const handler = async (event: any) => {
    const ruleType = event.ruleType; // Passed by Step Function or triggering event
    const result = await query('SELECT * FROM rules WHERE rule_type = $1 AND enabled = true', [ruleType]);
    if (result && result.rows) {
        const rules: Rule[] = result.rows;
        return rules;
    } else {
        console.error('No rules found/undefined query');
    }


    return result;
};