import styled from "styled-components";

const AdminPageWrapper = styled.div`
  width: 100%;
  padding: 36px;
`;

const AdminPageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  padding-block: 60px 30px;

  @media all and (min-width: 768px) {
    font-size: 36px;
    padding-block: 60px;
  }
`;

export { AdminPageWrapper, AdminPageTitle };
