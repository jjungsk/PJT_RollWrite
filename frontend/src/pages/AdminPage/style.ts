import styled from "styled-components";

const AdminPageWrapper = styled.div`
  width: 100%;
  padding: 36px;
`;

const AdminPageTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  padding-block: 60px 30px;

  @media all and (min-width: 768px) {
    font-size: 48px;
    padding-block: 60px;
  }
`;

const AdminPageIndexBtnContainer = styled.div`
  width: 240px;
  margin-inline: auto;

  button {
    width: 100%;
    height: 60px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    margin-block: 20px;
  }

  @media all and (min-width: 768px) {
    width: 360px;

    button {
      width: 100%;
      height: 80px;
      font-size: 32px;
    }
  }
`;

export { AdminPageWrapper, AdminPageTitle, AdminPageIndexBtnContainer };
