// import { StepFunctions } from 'aws-sdk';
// const stepFunctions = new StepFunctions();
// export const handler = async (event: any) => {
//     const stateMachineArn = process.env.STATE_MACHINE_ARN;
//     const params = {
//         stateMachineArn: stateMachineArn!,
//         input: JSON.stringify(event)
//     };
//     try {
//         const result = await stepFunctions.startExecution(params).promise();
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: "Step Function started successfully",
//                 executionArn: result.executionArn
//             })
//         };
//     } catch (error) {
//         const typedError = error as Error;  // Explicitly cast the error to type Error
//         console.error('Error starting Step Function:', typedError.message);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 message: "Failed to start Step Function",
//                 error: typedError.message
//             })
//         };
//     }
// };
