import styled from 'styled-components';
import { Form as FormAntd } from 'antd';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
  background-position: center;
  background-size: cover;
`;

export const Form = styled(FormAntd)`
  max-width: 500px;
  background-color: white;
  padding: 64px 32px;
  .remember-wrapper .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
  }
  .login-form-button {
    margin-bottom: 12px;
  }
`;
