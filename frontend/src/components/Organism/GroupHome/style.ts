import styled from "styled-components";

const GroupHomeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  width: 360px;

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

const GroupHomeCardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  text-align: start;

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
  & > svg {
    width: 32px;
    height: 32px;
  }
`;

export {
  GroupHomeCard,
  GroupHomeCardHeader,
  GroupHomeCardContent,
  GroupHomeCardFooter,
};
