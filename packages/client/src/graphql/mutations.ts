import { gql } from '@apollo/client';
import { TaskFields, UserFields } from './fragments';

export const LOGIN = gql`
  ${UserFields}
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
`;

export const REGISTER_USER = gql`
  ${UserFields}
  mutation Register($user_name: String!, $email: String!, $password: String!) {
    register(user_name: $user_name, email: $email, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
`;

export const CREATE_NEW_TASK = gql`
  ${TaskFields}
  mutation CreateTask($task: AddTaskInput!) {
    createTask(task: $task) {
      ...TaskFields
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      task_id
    }
  }
`;

export const UPDATE_TASK = gql`
  ${TaskFields}
  mutation UpdateTask($updateTaskId: ID!, $task: UpdateTaskInput!) {
    updateTask(id: $updateTaskId, task: $task) {
      ...TaskFields
    }
  }
`;

// export const UPDATE_TASK_STATUS = gql`
//   mutation UpdateTaskStatus($updateTaskId: ID!, $task: UpdateTaskInput!) {
//     updateTask(id: $updateTaskId, task: $task) {
//       task_id
//       completed
//     }
//   }
// `;
