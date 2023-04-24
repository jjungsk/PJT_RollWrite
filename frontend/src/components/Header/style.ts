import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0px 14px 0px 24px;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;

  svg {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--black-color);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding-top: 6px;
    margin-left: 4px;
  }
`;

export { HeaderContainer, HeaderTitle, BtnContainer };
