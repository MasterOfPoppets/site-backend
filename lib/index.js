'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServer = require('apollo-server');

var _graphqlTools = require('graphql-tools');

var _cols = require('../src/data/cols.json');

var _cols2 = _interopRequireDefault(_cols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = 'type Query {\n  cols: [Col]\n  aNumber: Int\n  # This query exists as a deprecation test\n  aTest: Int @deprecated(reason: "Testing deprecations")\n}\n\ntype Mutation {\n  greet(name: String): String\n}\n';
var Col = 'type Col {\n  name: String\n  profileDivisions: Int\n  profileGradients: [Float]\n}\n';


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
    },
    aTest: function aTest() {
      return 2;
    },
    cols: function cols() {
      return _cols2.default;
    }
  },
  Mutation: {
    greet: function greet(_, _ref) {
      var name = _ref.name;

      return 'Hello there, ' + name + '!';
    }
  }
};

var jsSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [Schema, Col],
  resolvers: resolvers,
  logger: logger,
  allowUndefinedInResolve: false, //optional
  resolverValidationOptions: {} });

app.use('*', (0, _cors2.default)());

app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServer.apolloExpress)({
  schema: jsSchema
}));

app.use('/graphiql', (0, _apolloServer.graphiqlExpress)({
  endpointURL: '/graphql'
}));

app.listen(8080);