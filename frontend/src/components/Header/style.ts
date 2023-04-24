import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;

  svg {
    cursor: pointer;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { HeaderContainer, BtnContainer };
