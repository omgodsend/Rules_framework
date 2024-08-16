import { Rule } from "../utils/types";
import { EvaluationResult } from "../utils/types";

export const handler = async (event: any) => {
    const data = event.data;
    const rules: Rule[] = event.rules; 
    
    const eval_result: EvaluationResult[] = rules.map(rule => {
        let passed = false;

        switch (rule.operator) {
            case '=':
                passed = data[rule.evaluation] == rule.comparator_value;
                break;
            case '>':
                passed = parseFloat(data[rule.evaluation]) > parseFloat(rule.comparator_value);
                break;
            case '<':
                passed = parseFloat(data[rule.evaluation]) < parseFloat(rule.comparator_value);
                break;
            case '>=':
                passed = parseFloat(data[rule.evaluation]) >= parseFloat(rule.comparator_value);
                break;
            case '<=':
                passed = parseFloat(data[rule.evaluation]) <= parseFloat(rule.comparator_value);
                break;
            case '!=':
                passed = data[rule.evaluation] != rule.comparator_value;
                break;
            default:
                console.warn(`Unknown operator: ${rule.operator}`);
                break;
        }

        return {
            ruleId: rule.id,
            evaluation: rule.evaluation,
            passed: passed
        };
    });

    return eval_result;
};   