import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import Schema from './schema/schema.graphql';
import Col from './schema/col.graphql';

import colData from '../src/data/cols.json';

const app = express();

const logger = {
  log: (e) => console.log(e),
};

const resolvers = {
  Query: {
    aNumber() {
      return 1;
    },
    aTest() {
      return 2;
    },
    cols() {
      return colData;
    },
  },
  Mutation: {
    greet(_, { name }) {
      return `Hello there, ${name}!`;
    }
  }
};

const jsSchema = makeExecutableSchema({
  typeDefs: [Schema, Col],
  resolvers,
  logger,
  allowUndefinedInResolve: false, //optional
  resolverValidationOptions: {}, //optional
});

app.use('*', cors());

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: jsSchema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(8080);
