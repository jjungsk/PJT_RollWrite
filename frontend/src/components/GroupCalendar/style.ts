import styled from "styled-components";

const GroupCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (height < 700px) {
    gap: 12px;
  }
`;

export { GroupCalendarContainer };
