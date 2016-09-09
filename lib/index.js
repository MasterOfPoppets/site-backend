'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServer = require('apollo-server');

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = 'type Query {\n  aNumber: Int\n}\n';


var app = (0, _express2.default)();

var logger = {
  log: function log(e) {
    return console.log(e);
  }
};

var resolvers = {
  Query: {
    aNumber: function aNumber() {
      return 1;
    }
  }
};

var jsSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [Schema],
  resolvers: resolvers,
  logger: logger,
  allowUndefinedInResolve: false, //optional
  resolverValidationOptions: {} });

app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServer.apolloExpress)({
  schema: jsSchema
}));

app.use('/graphiql', (0, _apolloServer.graphiqlExpress)({
  endpointURL: '/graphql'
}));

app.listen(8080);