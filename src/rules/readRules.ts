import { connectDB, query, disconnectDB } from '../utils/db';
import { Rule } from '../utils/types';

export const handler = async (event: any) => {
    console.log("Received event:", event);
    let eventData;
    try {
        eventData = JSON.parse(event.body).data;
    } catch (error) {
        console.error('Error parsing event body:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Bad request: Invalid JSON in the request body' })
        };
    }

    await connectDB();

    const rules = [];
    for (const key in eventData) {
        const result = await query('SELECT * FROM rules WHERE evaluation = $1 AND enabled = true', [key]);
        result.rows.forEach(row => {
            rules.push({
                id: row.id,
                evaluation: row.evaluation,
                operator: row.operator,
                comparator_value: row.comparator_value,
                enabled: row.enabled
            });
        });
    }

    await disconnectDB();

    if (rules.length === 0) {
        console.error('No enabled rules found for the given types');
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'No enabled rules found for given types' })
        };
    }

    console.log("Rules and data:", { rules, data: eventData });
    return {
        statusCode: 200,
        body: JSON.stringify({
            rules,
            data: eventData // Passing user data along with the rules
        })
    };
};




// import { connectDB, query, disconnectDB } from '../utils/db';
// import { Rule } from '../utils/types';

// export const handler = async (event: any) => {
//     console.log("Received event:", event);
//     let eventData;
//     try {
//         eventData = JSON.parse(event.body).data;
//     } catch (error) {
//         console.error('Error parsing event body:', error);
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ message: 'Bad request: Invalid JSON in the request body' })
//         };
//     }

//     await connectDB();  // Ensure the database is connected

//     // Assuming 'eventData' contains the keys matching the 'evaluation' column in your DB.
//     const results = await Promise.all(Object.keys(eventData).map(async (key) => {
//         return await query('SELECT * FROM rules WHERE evaluation = $1 AND enabled = true', [key]);
//     }));

//     await disconnectDB();  // Disconnect after the queries are done

//     // Explicitly type the accumulator as Rule[]
//     const rules: Rule[] = results.reduce((acc: Rule[], result) => {
//         if (result && result.rows) {
//             acc.push(...result.rows);
//         }
//         return acc;
//     }, []);

//     if (rules.length === 0) {
//         console.error('No rules found or undefined query results');
//         return {
//             statusCode: 404,
//             body: JSON.stringify({ message: 'No enabled rules found for given types' })
//         };
//     }

//     console.log("Rules found:", rules);
// return {
// statusCode: 200,
// body: JSON.stringify(rules)
// };
// };
