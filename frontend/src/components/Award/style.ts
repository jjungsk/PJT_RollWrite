import styled from "styled-components";

const AwardPageContainer = styled.div<{ padding?: string }>`
  height: calc(100vh);
  padding: ${(props) => props.padding || "16px 32px"};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
`;
const AwardPageHeader = styled.div`
  font-size: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const AwardPageContent = styled.div`
  display: flex;
  gap: 16px;
`;

export { AwardPageContainer, AwardPageHeader, AwardPageContent };
