import styled from "styled-components";

const AccordionItem = styled.div`
  width: 86%;
  margin: auto;
  border-bottom: 1px solid var(--darkgray-color);
  overflow: hidden;

  & > div:last-child {
    position: relative;
    padding-inline: 4px;
  }
`;

const AccordionItemTitle = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  height: 44px;
  padding-block: 11px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  justify-content: center;
  background-color: var(--bg-color);
  z-index: 99;

  & > svg {
    position: absolute;
    right: 5%;
    width: 20px;
    height: 20px;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: 0.3s;
  }
`;

export { AccordionItem, AccordionItemTitle };
