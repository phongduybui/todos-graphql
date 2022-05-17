import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import {
  AddTaskInput,
  Priority,
  UpdateTaskInput,
} from '../../../../__generated__/graphql';
import moment from 'moment';

interface AddTaskFormProps {
  visible: boolean;
  onCreate: (values: AddTaskInput) => void;
  onCancel: () => void;
  customText: { title: string; btnText: string };
  loading: boolean;
  data?: UpdateTaskInput;
}

const AddTask = ({
  visible,
  onCreate,
  onCancel,
  customText,
  loading = false,
  data = {},
}: AddTaskFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      task_due: data?.task_due ? moment(data.task_due) : null,
      priority: data?.priority || Priority.Medium,
    });
  }, [form, data]);

  return (
    <Modal
      visible={visible}
      title={customText.title}
      okText={loading ? 'Loading...' : customText.btnText}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="task_name"
          label="Task name"
          rules={[
            {
              required: true,
              message: 'Please input the name of task!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="task_description" label="Description">
          <Input type="textarea" aria-rowspan={5} />
        </Form.Item>
        <Form.Item label="Due date" name="task_due">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Radio.Group>
            <Radio value={Priority.Low}>Low</Radio>
            <Radio value={Priority.Medium}>Medium</Radio>
            <Radio value={Priority.High}>High</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTask;
