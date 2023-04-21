import styled from "styled-components";

const GhostBtn = styled.button`
  border: solid 2px var(--darkgray-color);
  border-radius: 10px;
  width: 160px;
  height: 52px;
  font-size: 20px;
  font-weight: bold;
`;
const FillBtn = styled.button`
  border: solid 2px var(--main-color);
  border-radius: 10px;
  width: 160px;
  height: 52px;
  font-size: 20px;
  color: white;
  background-color: var(--main-color);
  font-weight: bold;
`;
const NavBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 72px;
  height: 72px;
`;
const NavBtn = styled.button<{ isClicked?: boolean }>`
  width: 52px;
  height: 52px;
  background-color: ${(props) => (props.isClicked ? "var(--main-color)" : "")};
  border-radius: 16px;
`;
const NavBtnLabel = styled.div<{ isClicked?: boolean }>`
  color: ${(props) =>
    props.isClicked ? "var(--main-color)" : "var(--darkgray-color)"};
`;

export { GhostBtn, FillBtn, NavBtnContainer, NavBtn, NavBtnLabel };
