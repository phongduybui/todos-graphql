import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f3f5fa;
  padding: 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  > * {
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #ce3f57;
    border-color: #ce3f57;
  }
`;
