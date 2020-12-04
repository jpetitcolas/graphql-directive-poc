import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';

const typeDefs = `
    scalar GraphQLDateTime

    type Query {
        _dummy: String
        get(d: GraphQLDateTime): GraphQLDateTime
    }

    type Mutation {
        _dummy: String
    }
`;


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        GraphQLDateTime,
        Query: {
            get: (root, args) => args.d
        }
    },
    playground: true,
});

const app = express().use(bodyParser());
server.applyMiddleware({ app, cors: false });

app.listen(15030, () => {
    console.log(`GraphQL API listening on port 15030...`)
});
