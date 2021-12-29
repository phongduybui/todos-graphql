import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { loggedInUser } from '../../graphql/vars';
import { AuthPayload, MutationRegisterArgs } from '../../__generated__/graphql';
import * as S from '../LoginPage/styled';
import Spinner from '../../components/commons/Spinner';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [register, { error, loading }] = useMutation<
    { register: AuthPayload },
    MutationRegisterArgs
  >(REGISTER_USER, {
    onCompleted(data) {
      loggedInUser(data.register);
      localStorage.setItem('loggedInUser', JSON.stringify(data.register));
      navigate('/');
    },
  });

  const onFinish = ({ user_name, email, password }: any) => {
    register({
      variables: { user_name, email, password },
    });
  };

  useEffect(() => {
    if (loggedInUser()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <S.Wrapper>
      <S.Form onFinish={onFinish}>
        <Form.Item
          name='user_name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder='User name' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item
          help={error && error.message}
          validateStatus={error ? 'error' : 'success'}
        >
          <Button
            block
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Register
          </Button>
          Already have account? <Link to='/login'>Login now!</Link>
        </Form.Item>
        {loading && <Spinner />}
      </S.Form>
    </S.Wrapper>
  );
};

export default RegisterPage;
