import styled from "styled-components";
import { screenHight } from "../../constants/types";

const GhostBtn = styled.button<{ margin?: string }>`
  border: 2px solid var(--darkgray-color);
  border-radius: 10px;
  width: 128px;
  height: 48px;
  margin: ${(props) => props.margin};
  font-size: 20px;
  font-weight: bold;
  @media (${screenHight} < 700) {
    font-size: 16px;
    width: 112px;
    height: 40px;
  }
`;
const FillBtn = styled.button`
  border: 2px solid var(--main-color);
  border-radius: 10px;
  width: 128px;
  height: 48px;
  font-size: 20px;
  color: white;
  background-color: var(--main-color);
  font-weight: bold;
  @media (${screenHight} < 700) {
    font-size: 16px;
    width: 112px;
    height: 40px;
  }
`;
const NavBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 64px;
  height: 66px;
`;
const NavBtn = styled.button<{ isClicked?: boolean }>`
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.isClicked ? "var(--main-color)" : "")};
  border-radius: 16px;
`;
const NavBtnLabel = styled.div<{ isClicked?: boolean }>`
  color: ${(props) =>
    props.isClicked ? "var(--main-color)" : "var(--darkgray-color)"};
`;

export { GhostBtn, FillBtn, NavBtnContainer, NavBtn, NavBtnLabel };
