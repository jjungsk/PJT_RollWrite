import React from "react";
import {
  CardContainer,
  TagContainer,
  Title,
  SubTitle,
  HorizontalBtn,
} from "./style";
import GroupTag from "../../elements/GroupTag/GroupTag";
import { ReactComponent as Person } from "../../assets/Person.svg";
import { ReactComponent as Calendar } from "../../assets/Calendar.svg";
function GroupCard(props: {
  setHomeContent: (homeContent: number) => void;
  homeContent: number;
}) {
  return (
    <CardContainer margin={"16px 20px"}>
      <div>
        <Title>
          <div>자율PJT 팀 가보자구!!...</div>
        </Title>
        <SubTitle>2023.00.00 ~ 2023.00.00</SubTitle>
      </div>
      <TagContainer>
        <GroupTag label="친구" />
        <GroupTag label="프로젝트" />
        <GroupTag label="가나다라마바사" />
      </TagContainer>

      <HorizontalBtn onClick={() => props.setHomeContent(2)}>
        <Person />
        <p>6</p>
      </HorizontalBtn>
    </CardContainer>
  );
}

export default GroupCard;
