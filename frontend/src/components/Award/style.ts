import styled from "styled-components";

const AwardPageContainer = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || "16px 32px"};
  font-weight: bold;
  overflow: scroll;
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
