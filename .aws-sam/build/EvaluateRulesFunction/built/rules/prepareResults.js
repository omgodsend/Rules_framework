"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    // Parse the incoming JSON body
    let parsedBody;
    try {
        parsedBody = JSON.parse(event.body);
    }
    catch (error) {
        console.error('Error parsing event body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Bad request: Invalid JSON in the request body' })
        };
    }
    // Extract evaluation results
    const evaluationResults = parsedBody.evaluationResults;
    // Check if all rules passed
    const allPassed = evaluationResults.every(result => result.passed);
    let finalDecision;
    if (allPassed) {
        finalDecision = 'Approved';
    }
    else {
        finalDecision = 'Not Approved';
    }
    // Log or save the results as needed
    console.log('Evaluation Results:', evaluationResults);
    console.log('Final Decision:', finalDecision);
    return {
        statusCode: 200,
        body: JSON.stringify({
            finalDecision,
            evaluationResults
        })
    };
};
exports.handler = handler;
// export const handler = async (event: any) => {
//     const evaluationResults: EvaluationResult[] = event.evaluationResults;
//     // have all rules passed?
//     const allPassed = evaluationResults.every(result => result.passed);
//     let Decision;
//     if (allPassed) {
//         Decision = 'Approved';
//     } else {
//         Decision = 'Not Approved';
//     }
//     console.log('Evaluation Results:', evaluationResults);
//     console.log('Final Decision:', Decision);
//     return {
//         statusCode: 200,
//         body: JSON.stringify({
//             Decision,
//             evaluationResults
//         })
//     };
// };
