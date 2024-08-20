"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    const data = event.data;
    const rules = event.rules;
    const eval_result = rules.map(rule => {
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
exports.handler = handler;
