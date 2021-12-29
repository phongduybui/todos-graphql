import React from 'react';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import {
  AddTaskInput,
  Priority,
  UpdateTaskInput,
} from '../../../../__generated__/graphql';

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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="task_name"
          label="Task name"
          initialValue={data?.task_name}
          rules={[
            {
              required: true,
              message: 'Please input the name of task!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="task_description"
          label="Description"
          initialValue={data?.task_description}
        >
          <Input type="textarea" aria-rowspan={5} />
        </Form.Item>
        <Form.Item
          label="Due date"
          name="task_due"
          // initialValue={data?.task_due}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          initialValue={data?.priority || Priority.Medium}
        >
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
