import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import { Radio, RadioChangeEvent, Button, Tooltip, Dropdown, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import {
  CalendarOutlined,
  DownOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

import * as S from './styled';
import {
  AddTaskInput,
  Sort,
  Task,
  TasksOrderByInput,
} from '../../../../__generated__/graphql';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_TASK } from '../../../../graphql/mutations';
import { toast } from 'react-toastify';
import { GET_TASKS } from '../../../../graphql/queries';
import { useNavigate } from 'react-router-dom';
import AddTask from '../AddTask';
import ListTask from '../ListTask';

const TaskContainer = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<TasksOrderByInput>();

  const navigate = useNavigate();

  const [createTask, { loading: createTaskLoading }] = useMutation<
    { createTask: Task },
    { task: AddTaskInput }
  >(CREATE_NEW_TASK, {
    refetchQueries: [GET_TASKS],
  });

  function onFilterChange(e: RadioChangeEvent) {
    console.log(`radio checked:${e.target.value}`);
  }

  const onCreateTask = (values: AddTaskInput) => {
    createTask({
      variables: {
        task: {
          ...values,
          task_due: values.task_due?.toISOString(),
        },
      },
      onCompleted: (data) => {
        navigate('/');
        toast.success(
          `Create ${data.createTask.task_name.substring(0, 15)}... success`
        );
      },
    });
    setIsOpenForm(false);
  };

  const onSearch = (text: string): void => {
    setSearchTerm(text.trim());
    navigate('/');
  };
  const onSortChange = (event: MenuInfo): void => {
    const orders = event.key.split(':');
    const orderName = orders[0];
    const orderValue = orders[1] as Sort;
    setOrderBy({
      [orderName]: orderValue,
    });
  };

  return (
    <S.Wrapper>
      <SearchBar onSearch={onSearch} />
      <S.ToolbarWrapper>
        <div>
          <Radio.Group onChange={onFilterChange} defaultValue="all">
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="completed">Completed</Radio.Button>
            <Radio.Button value="uncompleted">Uncompleted</Radio.Button>
          </Radio.Group>
          <Dropdown
            overlay={
              <Menu onClick={(e) => onSortChange(e)}>
                <Menu.Item
                  key={`task_name:${Sort.Asc}`}
                  icon={<SortAscendingOutlined />}
                >
                  Asc by name
                </Menu.Item>
                <Menu.Item
                  key={`task_name:${Sort.Desc}`}
                  icon={<SortDescendingOutlined />}
                >
                  Desc by name
                </Menu.Item>
                <Menu.Item
                  key={`task_due:${Sort.Asc}`}
                  icon={<CalendarOutlined />}
                >
                  Asc by due
                </Menu.Item>
                <Menu.Item
                  key={`task_due:${Sort.Desc}`}
                  icon={<CalendarOutlined />}
                >
                  Desc by due
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              Sort by <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <Tooltip title="search">
          <S.ButtonContainer>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => setIsOpenForm(true)}
            >
              Add new task
            </Button>
          </S.ButtonContainer>
        </Tooltip>
      </S.ToolbarWrapper>

      <ListTask searchTerm={searchTerm} orderBy={orderBy} />

      <AddTask
        visible={isOpenForm}
        onCreate={onCreateTask}
        onCancel={() => setIsOpenForm(false)}
        customText={{
          title: 'Create a new task',
          btnText: 'Create',
        }}
        loading={createTaskLoading}
      />
    </S.Wrapper>
  );
};

export default TaskContainer;
