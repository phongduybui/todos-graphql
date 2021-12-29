import styled from 'styled-components';

interface TaskWrapperProps {
  isCompleted?: boolean;
}

export const TaskWrapper = styled.div<TaskWrapperProps>`
  height: 100px;
  width: 100%;
  background-color: ${({ isCompleted }) => (isCompleted ? '#ccc8c8' : '#fff')};
  padding: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 12px;
`;

export const Action = styled.div`
  margin-right: 8px;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  > * {
    margin-right: 8px;
  }
`;
