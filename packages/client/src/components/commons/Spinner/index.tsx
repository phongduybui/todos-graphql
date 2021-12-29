import React from 'react';
import { Spin, SpinProps } from 'antd';
import { Wrapper } from './styled';

const Spinner = (props: SpinProps) => {
  return (
    <Wrapper>
      <Spin {...props} />
    </Wrapper>
  );
};

export default Spinner;
