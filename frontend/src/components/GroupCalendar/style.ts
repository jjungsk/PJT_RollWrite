import styled from "styled-components";
import { screenHight } from "../../constants/types";

const GroupCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 4vh;

  @media (${screenHight} < 700) {
    gap: 4px;
    padding-top: 0;
  }
`;

export { GroupCalendarContainer };
