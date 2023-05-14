import styled from "styled-components";

const GroupQuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  gap: 16px;

  text-align: start;
`;

const GroupQuestionInput = styled.input`
  width: 300px;
  height: 52px;
  font-size: 16px;
  font-weight: bold;
  background-color: var(--lightgray-color);
  border-radius: 16px;
  padding: 16px;
  margin: 32px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
`;

export { GroupQuestionHeader, GroupQuestionInput };
