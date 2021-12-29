import { gql } from '@apollo/client';
import { TaskFields } from './fragments';

export const GET_TASKS = gql`
  ${TaskFields}
  query Tasks(
    $offset: Int
    $limit: Int
    $filter: String
    $orderBy: TasksOrderByInput
  ) {
    tasks(offset: $offset, limit: $limit, filter: $filter, order_by: $orderBy) {
      count
      tasks {
        ...TaskFields
      }
    }
  }
`;
