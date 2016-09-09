import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import Schema from './schema/schema.graphql';

const app = express();

const logger = {
  log: (e) => console.log(e),
};

const resolvers = {
  Query: {
    aNumber() {
      return 1;
    },
  },
};

const jsSchema = makeExecutableSchema({
  typeDefs: [Schema],
  resolvers,
  logger,
  allowUndefinedInResolve: false, //optional
  resolverValidationOptions: {}, //optional
});

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: jsSchema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(8080);
