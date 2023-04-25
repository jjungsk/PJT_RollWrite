import styled from "styled-components";

const HomePageContainer = styled.div`
  position: relative;

  > .back_btn {
    position: absolute;
    top: 80px;
    left: 8px;
    width: 24px;
    height: 24px;
  }
  > .prev_btn {
    position: absolute;
    top: 80px;
    right: 8px;
    width: 24px;
    height: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 16px 24px;
  font-size: 20px;

  @media (height < 700px) {
    margin: 8px 24px;
  }
`;

const HeaderTitle = styled.div`
  line-height: 30px;
  > span {
    font-weight: bold;
  }
`;

export { HomePageContainer, Header, HeaderTitle };
