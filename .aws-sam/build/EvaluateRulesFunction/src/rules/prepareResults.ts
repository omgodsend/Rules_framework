import { EvaluationResult } from "../utils/types";

export const handler = async (event: any) => {
    const evaluationResults: EvaluationResult[] = event.evaluationResults;

    // have all rules passed?
    const allPassed = evaluationResults.every(result => result.passed);

    let Decision;
    if (allPassed) {
        Decision = 'Approved';
    } else {
        Decision = 'Not Approved';
    }

    console.log('Evaluation Results:', evaluationResults);
    console.log('Final Decision:', Decision);

    return {
        statusCode: 200,
        body: JSON.stringify({
            Decision,
            evaluationResults
        })
    };
};