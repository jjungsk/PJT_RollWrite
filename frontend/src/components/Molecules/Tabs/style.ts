import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  position: relative;
  height: 32px;
`;

const TabsContent = styled.div<{ isClicked: boolean }>`
  font-size: 14px;
  color: ${(props) =>
    props.isClicked ? "var(--black-color)" : "var(--darkgray-color)"};
  line-height: 32px;
  min-width: 66px;
  height: 32px;
  cursor: pointer;
`;

const TabsUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 66px;
  height: 1px;
  background-color: var(--black-color);
  transition: left 0.3s ease-in-out;
`;

export { TabsContainer, TabsContent, TabsUnderline };
