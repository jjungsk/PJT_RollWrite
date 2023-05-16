import styled from "styled-components";

const GroupInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  width: 100%;
`;

const GroupInfoCardHeader = styled.div`
  font-weight: bold;
`;

const GroupInfoCardTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  & > div {
    padding: 4px 8px;
    height: 25px;

    background: #f9aa4c;
    border-radius: 16px;
  }
`;

export { GroupInfoCard, GroupInfoCardTagContainer, GroupInfoCardHeader };
