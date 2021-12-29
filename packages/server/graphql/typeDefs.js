const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    task_id: ID!
    task_name: String!
    task_description: String
    priority: Priority!
    completed: Boolean!
    task_due: Date!
    user_id: String!
  }

  type User {
    user_id: ID!
    user_name: String!
    email: String!
    avatar: String!
    provider: Provider!
  }

  type Query {
    me: User!
    task(id: ID!): Task!
    tasks(
      offset: Int = 0
      limit: Int = 3
      filter: String
      order_by: TasksOrderByInput
    ): TasksPayload
  }

  type Mutation {
    register(user_name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createTask(task: AddTaskInput!): Task
    updateTask(id: ID!, task: UpdateTaskInput!): Task
    deleteTask(id: ID!): DeleteTaskPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type DeleteTaskPayload {
    task_id: ID!
  }

  scalar Date

  enum Priority {
    low
    medium
    high
  }

  enum Provider {
    system
    google
  }

  input AddTaskInput {
    task_name: String!
    task_description: String!
    priority: Priority
    completed: Boolean
    task_due: Date
  }

  input UpdateTaskInput {
    task_name: String
    task_description: String
    priority: Priority
    completed: Boolean
    task_due: Date
  }

  input TasksOrderByInput {
    task_name: Sort
    task_due: Sort
  }

  enum Sort {
    ASC
    DESC
  }

  type TasksPayload {
    count: Int!
    tasks: [Task!]!
  }
`;

module.exports = typeDefs;
