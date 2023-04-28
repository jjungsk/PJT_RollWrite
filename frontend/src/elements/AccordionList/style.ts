import styled from "styled-components";

const AccordionItem = styled.div`
  width: 80%;
  margin: auto;
  border-bottom: 1px solid var(--darkgray-color);
  overflow: hidden;
`;

const AccordionItemTitle = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  height: 48px;
  padding-block: 13px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  justify-content: center;
  background-color: var(--bg-color);
  z-index: 99;

  & > svg {
    width: 24px;
    height: 24px;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const AccordionItemContent = styled.div<{ isOpen: boolean }>`
  position: relative;
  height: fit-content;
  padding-block: 8px 16px;

  animation: spread 0.4s;
`;

export { AccordionItem, AccordionItemTitle, AccordionItemContent };
