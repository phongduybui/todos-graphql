import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { PieChart } from 'react-minimal-pie-chart';
import { loggedInUser } from '../../../../graphql/vars';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

const Analysis = () => {
  const userData = loggedInUser();
  const client = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    loggedInUser(null);
    localStorage.removeItem('loggedInUser');
    await client.clearStore();
    navigate('login');
  };

  return (
    <S.AnalysisWrapper>
      <S.UserWrapper>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Button
                  block
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            {userData?.user?.user_name} <DownOutlined />
          </Button>
        </Dropdown>
        ,
      </S.UserWrapper>
      <PieChart
        data={[
          { title: 'Completed', value: 25, color: '#5ab80d' },
          { title: 'Uncompleted', value: 15, color: '#ebaf0a' },
        ]}
        radius={PieChart.defaultProps.radius - 6}
        lineWidth={60}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={1}
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
        labelPosition={70}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
        style={{
          fontSize: '8px',
        }}
      />
    </S.AnalysisWrapper>
  );
};

export default Analysis;
