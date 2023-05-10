import styled from "styled-components";

const GroupCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 4vh;

  @media (height < 700) {
    gap: 4px;
    padding-top: 0;
  }
`;

export { GroupCalendarContainer };
