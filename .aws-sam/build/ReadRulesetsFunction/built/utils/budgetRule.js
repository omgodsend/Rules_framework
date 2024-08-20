// import { client } from '../utils/db';
// import { Rule, EvaluationResult } from '../utils/types';
// export async function evaluateBudgetRule(data: any): Promise<EvaluationResult[]> {
//     await client.connect();
//     const response = await client.query('SELECT * FROM rules WHERE rule_type = \'budget\' AND enabled = true;');
//     const rules: Rule[] = response.rows;
//     client.end();
//     return rules.map((rule: Rule): EvaluationResult => ({
//         ruleId: rule.id,
//         ruleName: rule.rule_name,
//         passed: data.budget <= JSON.parse(rule.conditions).max_budget,
//         action: rule.action
//     }));
// }
