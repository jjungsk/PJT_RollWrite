import styled from "styled-components";

const HeaderContainer = styled.div<{ padding?: string }>`
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;

  font-size: 16px;
  font-weight: bold;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;

  & > svg {
    height: 32px;
    width: 32px;
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

const HeaderGroupTitle = styled.div`
  width: calc(100% - 100px);
  min-width: 200px;

  & > div:first-child {
    height: 36px;
    display: flex;
    font-size: 16px;
    line-height: 17px;
    font-weight: bold;
    color: black;
    justify-content: center;
    align-items: center;

    & > svg {
      width: 20px;
      height: 20px;
      margin-left: 6px;
      cursor: default;
    }

    & > div:last-child {
      font-size: 16px;
      line-height: 18px;
    }
  }

  & > div:last-child {
    height: 10px;
    font-size: 10px;
    line-height: 10px;
    color: var(--darkgray-color);
  }
`;

export { HeaderContainer, HeaderTitle, HeaderGroupTitle, BtnContainer };
