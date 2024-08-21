"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    const data = event.data; // Assuming data comes structured as needed
    const rules = event.rules; // Assuming rules are directly passed
    // Evaluate all rules
    const evaluationResults = rules.map(rule => {
        let passed = false;
        // Evaluate based on the operator
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
                console.error(`Unknown operator: ${rule.operator}`);
                return; // Exiting early in case of unknown operator
        }
        return {
            ruleId: rule.id,
            evaluation: rule.evaluation,
            passed: passed
        };
    });
    // Log or return the result as needed
    console.log("Evaluation results:", evaluationResults);
    return { evaluationResults };
};
exports.handler = handler;
// import { Rule } from "../utils/types";
// import { EvaluationResult } from "../utils/types";
// export const handler = async (event: any) => {
//     const data = event.data;
//     const rules: Rule[] = event.rules; 
//     const eval_result: EvaluationResult[] = rules.map(rule => {
//         let passed = false;
//         switch (rule.operator) {
//             case '=':
//                 passed = data[rule.evaluation] == rule.comparator_value;
//                 break;
//             case '>':
//                 passed = parseFloat(data[rule.evaluation]) > parseFloat(rule.comparator_value);
//                 break;
//             case '<':
//                 passed = parseFloat(data[rule.evaluation]) < parseFloat(rule.comparator_value);
//                 break;
//             case '>=':
//                 passed = parseFloat(data[rule.evaluation]) >= parseFloat(rule.comparator_value);
//                 break;
//             case '<=':
//                 passed = parseFloat(data[rule.evaluation]) <= parseFloat(rule.comparator_value);
//                 break;
//             case '!=':
//                 passed = data[rule.evaluation] != rule.comparator_value;
//                 break;
//             default:
//                 console.warn(`Unknown operator: ${rule.operator}`);
//                 break;
//         }
//         return {
//             ruleId: rule.id,
//             evaluation: rule.evaluation,
//             passed: passed
//         };
//     });
//     return eval_result;
// };   
