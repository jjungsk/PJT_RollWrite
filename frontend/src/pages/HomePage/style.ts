import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 16px 24px;
  font-size: 20px;

  & > div {
    line-height: 30px;
    display: flex;
  }
  & > div > span {
    font-weight: bold;
  }
  @media (height < 700) {
    padding: 8px 24px;
  }
`;

export { HomePageContainer, HomePageHeader };
