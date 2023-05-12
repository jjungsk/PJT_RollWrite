import styled from "styled-components";

const BackNavigationContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;

  svg {
    cursor: pointer;
  }

  & > div:last-child {
    width: 30px;
    height: 30px;
  }
`;

const BackNavigationTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--black-color);
`;

export { BackNavigationContainer, BackNavigationTitle };
