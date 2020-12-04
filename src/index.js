import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';


class UselessDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
    }

    visitFieldDefinition(field, details) {
    }
}


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
    schemaDirectives: {
        useless: UselessDirective
    },
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

app.listen(4000, () => {
    console.log(`GraphQL API listening on port 4000...`)
});
