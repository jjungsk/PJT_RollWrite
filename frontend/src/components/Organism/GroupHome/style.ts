import styled from "styled-components";

const GroupHomeCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 12px 24px 24px;
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
  font-size: 18px;
  font-weight: bold;
`;

const GroupHomeCardContent = styled.div<{
  flexDirection?: string;
  alignItem?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: center;
  align-items: ${(props) => props.alignItem};
  padding: 0px;
  gap: ${(props) => props.gap || "16px"};
  text-align: start;
  width: 100%;

  & > svg {
    width: 64px;
    height: 64px;
  }
`;

const GroupHomeCardFooter = styled.div`
  background-color: var(--main-color);
  color: var(--white-color);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
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
