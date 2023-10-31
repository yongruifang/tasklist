import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import serverlessExpress from '@vendia/serverless-express'
import express from 'express'
import cors from 'cors'
import { buildSchema } from "type-graphql"
import { TodoItemResolver } from "./graph/TodoItemResolver"
import { Prefill } from "./graph/Prefill"
import { Mongo } from "./database/Database"
import { GraphQLSchema } from "graphql"

let serverlessExpressInstance: any
async function setup(event: any, context: any) {
    const mongo = new Mongo()
    mongo.Connect()
    const schema: GraphQLSchema = await buildSchema({
        resolvers: [TodoItemResolver],
        validate: false,
    })
    await Prefill.Instance.Populate()
    const server = new ApolloServer({ schema })
    server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
    const app = express();
    app.use(
        cors(),
        express.json(),
        expressMiddleware(server, {
            // The Express request and response objects are passed into
            // your context initialization function
            context: async ({ req, res }) => {
                // Here is where you'll have access to the
                // API Gateway event and Lambda Context
                return {
                    expressRequest: req,
                    expressResponse: res,
                };
            },
        }),
    );
    serverlessExpressInstance = serverlessExpress({ app })
    return serverlessExpressInstance(event, context, undefined)
}
export function handler(event: any, context: any) {
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

    return setup(event, context)
}


// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//     Query: {
//         hello: () => 'world',
//     },
// };

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });

// server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

// const app = express();
// app.use(
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//         // The Express request and response objects are passed into
//         // your context initialization function
//         context: async ({ req, res }) => {
//             // Here is where you'll have access to the
//             // API Gateway event and Lambda Context
//             return {
//                 expressRequest: req,
//                 expressResponse: res,
//             };
//         },
//     }),
// );

// export const handler = serverlessExpress({ app });