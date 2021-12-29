import React, { useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import {
  TasksOrderByInput,
  TasksPayload,
} from '../../../../__generated__/graphql';
import { GET_TASKS } from '../../../../graphql/queries';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import TaskItem from '../TaskItem';
import * as S from './styled';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

interface GetTasksArgs {
  offset?: number;
  limit?: number;
  filter?: string;
  orderBy?: TasksOrderByInput;
}

interface ListTaskProps {
  searchTerm: string;
  orderBy?: TasksOrderByInput;
}

const ListTask = ({ searchTerm, orderBy }: ListTaskProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [limit] = useState(3);
  const [offset, setOffset] = useState(0);
  const { pageNumber } = queryString.parse(location.search);
  const page = pageNumber ? parseInt(pageNumber as string) : 1;

  const { data, loading } = useQuery<{ tasks: TasksPayload }, GetTasksArgs>(
    GET_TASKS,
    {
      variables: {
        offset: searchTerm ? 0 : offset,
        limit,
        filter: searchTerm,
        orderBy,
      },
      // fetchPolicy: 'network-only',
      onError: (error) => toast.error(error.message),
    }
  );

  const onPageChange = (newPage: number): void => {
    navigate(`?pageNumber=${newPage}`);
    setOffset((newPage - 1) * limit);
  };

  // useEffect(() => {
  //   getTasks({
  //     variables: {
  //       offset: searchTerm ? 1 : offset,
  //       limit,
  //       filter: searchTerm,
  //       orderBy,
  //     },
  //   });
  // }, [offset, limit, searchTerm, orderBy, getTasks]);

  if (loading) {
    return (
      <div>
        {[...Array(3)].map((_, i) => (
          <Skeleton active paragraph={{ rows: 2 }} key={i} />
        ))}
      </div>
    );
  }
  return (
    <S.ListTask>
      {data?.tasks?.tasks?.map((task) => (
        <TaskItem {...task} key={task?.task_id} />
      ))}
      {data?.tasks?.count && data?.tasks?.count > limit && (
        <Pagination
          style={{ textAlign: 'right' }}
          current={page}
          onChange={onPageChange}
          pageSize={limit}
          total={data.tasks.count}
        />
      )}
    </S.ListTask>
  );
};

export default ListTask;
