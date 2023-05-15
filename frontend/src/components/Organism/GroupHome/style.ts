import styled from "styled-components";

const GroupHomeCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  width: 100%;

  font-size: 16px;
`;

const GroupHomeCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;

  font-weight: bold;
`;

const GroupHomeCardContent = styled.div<{
  flexDirection?: string;
  alignItem?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: ${(props) => props.alignItem};
  padding: 0px;
  gap: 16px;
  text-align: start;
  width: 100%;

  & > svg {
    width: 64px;
    height: 64px;
  }
`;

const GroupHomeCardFooter = styled.div`
  color: var(--darkgray-color);
  display: flex;
  justify-content: end;
  width: 100%;
  line-height: 32px;
  & > div {
    display: flex;
    & > svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export {
  GroupHomeCard,
  GroupHomeCardHeader,
  GroupHomeCardContent,
  GroupHomeCardFooter,
};
