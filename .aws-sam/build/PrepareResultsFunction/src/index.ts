// import { Context } from 'aws-lambda';
// import { evaluateBudgetRule } from './rules/budgetRule';
// import 'dotenv/config';

// interface CustomEvent {
//     data: any;  // Define the structure of your expected event data here
// }

// export const handler = async (event: CustomEvent, context: Context) => {
 
//     const data = event.data;

//     try {
//         const result = await evaluateBudgetRule(data);
//         return {
//             statusCode: 200,
//             body: JSON.stringify(result),
//         };
//     } catch (error) {
//         console.error('Error handling event:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Internal server error' })
//         };
//     }
// };