import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';
import { loggedInUser } from '../../graphql/vars';
import { AuthPayload, MutationLoginArgs } from '../../__generated__/graphql';
import * as S from './styled';
import Spinner from '../../components/commons/Spinner';

const LoginPage = () => {
  const navigate = useNavigate();

  const [login, { error, loading }] = useMutation<
    { login: AuthPayload },
    MutationLoginArgs
  >(LOGIN, {
    onCompleted(userData) {
      loggedInUser(userData.login);
      localStorage.setItem('loggedInUser', JSON.stringify(userData.login));
      navigate('/');
    },
  });

  const onFinish = ({ email, password }: any) => {
    login({
      variables: {
        email,
        password,
      },
    });
  };

  useEffect(() => {
    if (loggedInUser()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <S.Wrapper>
      <S.Form initialValues={{ remember: true }} onFinish={onFinish}>
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
        <Form.Item className='remember-wrapper'>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to='' style={{ display: 'block' }}>
            Forgot password
          </Link>
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
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
        {loading && <Spinner />}
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginPage;
