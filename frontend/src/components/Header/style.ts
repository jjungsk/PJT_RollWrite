import styled from "styled-components";

const HeaderContainer = styled.div<{ padding?: string }>`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: ${(props) => (props.padding ? props.padding : "0px 14px 0px 24px")};
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

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding-top: 6px;
    margin-left: 4px;
  }
`;

export { HeaderContainer, HeaderTitle, HeaderGroupTitle, BtnContainer };
