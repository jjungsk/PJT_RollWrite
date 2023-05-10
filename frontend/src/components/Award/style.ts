import styled from "styled-components";
import { screenHight } from "../../constants/types";

const AwardPageContainer = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || "16px 32px"};
  font-weight: bold;
  min-height: 80vh;
  overflow: auto;
  height: ${screenHight}px;
`;
const AwardPageHeader = styled.div`
  font-size: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0px;

  & > p {
    font-size: 32px;
    margin: 16px 0px;
    font-weight: bold;
  }
`;

const AwardPageContent = styled.div`
  display: flex;
  margin: 24px 0px;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

export { AwardPageContainer, AwardPageHeader, AwardPageContent };
