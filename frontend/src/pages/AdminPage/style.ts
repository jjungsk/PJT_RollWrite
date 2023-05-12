import styled from "styled-components";

const AdminPageWrapper = styled.div`
  width: 100%;
  padding: 32px;
`;

const AdminPageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;

  @media all and (min-width: 768px) {
    font-size: 36px;
    padding-block: 32px;
  }
`;

export { AdminPageWrapper, AdminPageTitle };
