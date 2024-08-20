"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    const evaluationResults = event.evaluationResults;
    // have all rules passed?
    const allPassed = evaluationResults.every(result => result.passed);
    let Decision;
    if (allPassed) {
        Decision = 'Approved';
    }
    else {
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
exports.handler = handler;
