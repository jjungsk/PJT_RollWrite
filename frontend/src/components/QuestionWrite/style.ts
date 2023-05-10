import styled from "styled-components";
import { screenHight } from "../../constants/types";

const Title = styled.div`
  font-size: 16px;
  margin: 16px;

  @media (${screenHight} < 700) {
    font-size: 14px;
    margin: 12px;
  }
`;

const SubTitle = styled.div`
  font-size: 32px;
  margin: 12px;
  font-weight: bold;

  @media (${screenHight} < 700) {
    font-size: 24px;
    margin: 8px;
  }
`;

const QuestionInput = styled.input`
  width: 300px;
  height: 52px;
  font-size: 16px;
  font-weight: bold;
  background-color: var(--lightgray-color);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
`;

const QuestionCount = styled.div`
  padding: 4px 44px;
  text-align: end;
`;
export { Title, SubTitle, QuestionInput, QuestionCount };
