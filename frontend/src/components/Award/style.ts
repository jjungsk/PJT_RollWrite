import styled from "styled-components";

const deviceHeight = window.innerHeight;

const AwardPageContainer = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || "16px 32px"};
  font-weight: bold;
  min-height: 80vh;
  overflow: scroll;
  height: ${deviceHeight}px;
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
  overflow: auto;
`;

export { AwardPageContainer, AwardPageHeader, AwardPageContent };
