import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInUser } from '../../graphql/vars';
import Analysis from './components/Analysis';
import TaskContainer from './components/TaskContainer';
import * as S from './styled';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser()) {
      navigate('login');
    }
  });
  return (
    <S.HomeWrapper>
      <Row style={{ height: '100%' }}>
        <Col md={24} lg={16}>
          <TaskContainer />
        </Col>
        <Col md={24} lg={8}>
          <Analysis />
        </Col>
      </Row>
    </S.HomeWrapper>
  );
};

export default HomePage;
