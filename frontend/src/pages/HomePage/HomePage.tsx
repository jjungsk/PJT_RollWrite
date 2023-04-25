import React, { useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import GroupCard from "../../components/GroupCard/GroupCard";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { ReactComponent as BackCircle } from "../../assets/Back_Circle.svg";
import { ReactComponent as PrevCircle } from "../../assets/Prev_Circle.svg";
import { HomePageContainer, Header, HeaderTitle } from "./style";
import QuestionWrite from "../../components/QuestionWrite/QuestionWrite";

function HomePage() {
  const [homeContent, setHomeContent] = useState(0); // 0:달력, 1:질문, 2:참여지
  return (
    <HomePageContainer>
      <Header>
        <HeaderTitle>
          <span>주대선</span> 님의 모임
        </HeaderTitle>
        <Plus />
      </Header>
      <GroupCard />
      {homeContent === 0 && <Calendar setHomeContent={setHomeContent} />}
      {homeContent === 1 && <QuestionWrite setHomeContent={setHomeContent} />}
      <BackCircle className="back_btn" />
      <PrevCircle className="prev_btn" />
    </HomePageContainer>
  );
}

export default HomePage;
