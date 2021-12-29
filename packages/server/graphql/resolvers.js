const { dateScalar } = require('./scalars');

const resolvers = {
  Date: dateScalar,
  Query: {
    me(parent, args, context) {
      return context.dataSources.todosAPI.getMe();
    },
    task(parent, { id }, context) {
      return context.dataSources.todosAPI.getTask(id);
    },
    tasks(parent, args, context) {
      return context.dataSources.todosAPI.getTasks(args);
    },
  },
  Mutation: {
    register(parent, args, { dataSources }) {
      return dataSources.todosAPI.register(args);
    },
    login(parent, args, { dataSources }) {
      return dataSources.todosAPI.login(args);
    },
    createTask(parent, { task }, { dataSources }) {
      return dataSources.todosAPI.createTask(task);
    },
    updateTask(parent, { id, task }, { dataSources }) {
      return dataSources.todosAPI.updateTask({ id, task });
    },
    deleteTask(parent, { id }, { dataSources }) {
      return dataSources.todosAPI.deleteTask(id);
    },
  },
};

module.exports = resolvers;
