import React, { useState } from 'react';
import { Task, UpdateTaskInput } from '../../../../__generated__/graphql';
import { Button, Checkbox, Typography, Popconfirm } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import * as S from './styled';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../../../../graphql/mutations';
import { GET_TASKS } from '../../../../graphql/queries';
import { toast } from 'react-toastify';
import AddTask from '../AddTask';

const TaskItem = ({
  task_id,
  task_name,
  task_due,
  task_description,
  priority,
  completed,
  user_id,
}: Task) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [updateStatus] = useMutation<
    { updateTask: Task },
    { updateTaskId: string; task: UpdateTaskInput }
  >(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
    optimisticResponse: {
      updateTask: {
        completed: !completed,
        priority,
        task_description,
        task_due,
        task_id,
        task_name,
        user_id,
        __typename: 'Task',
      },
    },
  });

  const [updateTask] = useMutation<
    { updateTask: Task },
    { updateTaskId: string; task: UpdateTaskInput }
  >(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const [deleteTask] = useMutation<
    { deleteTask: Task },
    { deleteTaskId: string }
  >(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const handleChangeStatus = (e: CheckboxChangeEvent) => {
    updateStatus({
      variables: {
        updateTaskId: task_id,
        task: {
          completed: e.target.checked,
        },
      },
    });
  };

  const onConfirmDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    deleteTask({
      variables: {
        deleteTaskId: task_id,
      },
      onCompleted: () => toast.success('Delete successfully!'),
    });
  };

  const handleUpdateTask = (values: UpdateTaskInput) => {
    updateTask({
      variables: {
        updateTaskId: task_id,
        task: {
          ...values,
          task_due: values?.task_due
            ? values.task_due?.toISOString()
            : task_due,
        },
      },
      onCompleted: () => {
        toast.success(`Update task success`);
      },
    });
    setIsOpenForm(false);
  };

  return (
    <S.TaskWrapper isCompleted={completed}>
      <Checkbox checked={completed} onChange={handleChangeStatus} />
      <S.Content>
        <Typography.Text ellipsis={true} style={{ maxWidth: 400 }}>
          {task_name}
        </Typography.Text>
        <Typography.Text
          type="secondary"
          ellipsis={true}
          style={{ maxWidth: 400 }}
        >
          {task_description}
        </Typography.Text>
        <S.MetaInfo>
          <ClockCircleOutlined />
          <Typography.Text type="secondary">{task_due}</Typography.Text>
          <div>
            <FlagOutlined /> {priority}
          </div>
        </S.MetaInfo>
      </S.Content>
      <S.Action>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => setIsOpenForm(true)}
        />
      </S.Action>

      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={onConfirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button type="default" danger icon={<DeleteOutlined />} />
      </Popconfirm>
      <AddTask
        visible={isOpenForm}
        onCreate={handleUpdateTask}
        onCancel={() => setIsOpenForm(false)}
        customText={{
          title: 'Update task',
          btnText: 'Update',
        }}
        loading={false}
        data={{
          task_name,
          task_due,
          task_description,
          priority,
        }}
      />
    </S.TaskWrapper>
  );
};

export default TaskItem;
