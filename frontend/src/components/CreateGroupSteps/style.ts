import styled from "styled-components";

const CreateGroupStepsContainer = styled.div`
  height: calc(100vh - 60px);
  padding: 0px 32px;
`;

const CreateGroupStepsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  font-size: 24px;
  font-weight: bold;
  height: 64px;
`;

const CreateGroupStepsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 64px);
  align-items: center;
`;

export {
  CreateGroupStepsHeader,
  CreateGroupStepsContainer,
  CreateGroupStepsContent,
};
