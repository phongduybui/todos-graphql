const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const TodosAPI = require('./todosAPI');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      todosAPI: new TodosAPI(),
    };
  },
  context: ({ req }) => ({
    token: req.headers.authorization,
  }),
});

module.exports = server;
