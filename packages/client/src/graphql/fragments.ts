import { gql } from '@apollo/client';

export const UserFields = gql`
  fragment UserFields on User {
    user_id
    user_name
    email
    avatar
  }
`;

export const TaskFields = gql`
  fragment TaskFields on Task {
    task_id
    task_name
    task_description
    priority
    completed
    task_due
    user_id
  }
`;
