import React, { useEffect, useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import GroupCard from "../../components/GroupCard/GroupCard";
import QuestionWrite from "../../components/QuestionWrite/QuestionWrite";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { HomePageContainer, Header, HeaderTitle } from "./style";
import { useNavigate } from "react-router-dom";
import { getQuestionList, getGroupList } from "../../apis/group";
import { GroupInfo, Question } from "../../constants/types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function HomePage() {
  const navigate = useNavigate();
  const [homeContent, setHomeContent] = useState(0); // 0:달력, 1:질문, 2:참여지
  const [groupList, setGroupList] = useState<GroupInfo[]>();
  const [nowIndex, setNowIndex] = useState(0);
  const [qusetionList, setQuestionList] = useState<Question[]>();
  useEffect(() => {
    getGroupList()
      .then((res) => {
        console.log(res);
        setGroupList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    groupList &&
      getQuestionList(groupList[nowIndex].meetingId)
        .then((res) => {
          console.log(res);
          setQuestionList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [nowIndex, groupList]);

  return (
    <HomePageContainer>
      <Header>
        <HeaderTitle>
          <span>주대선</span> 님의 모임
        </HeaderTitle>
        <Plus
          onClick={() => {
            navigate("/create");
          }}
        />
      </Header>

      <Swiper
        width={360}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(e) => setNowIndex(e.activeIndex)}
      >
        {groupList?.map((groupInfo, i) => (
          <SwiperSlide key={i}>
            <GroupCard groupInfo={groupInfo} />
          </SwiperSlide>
        ))}
      </Swiper>

      {homeContent === 0 && (
        <Calendar
          setHomeContent={setHomeContent}
          questionList={qusetionList}
          startDay={groupList?.[nowIndex].startDay}
          endDay={groupList?.[nowIndex].endDay}
          color={groupList?.[nowIndex].color}
        />
      )}
      {homeContent === 1 && <QuestionWrite setHomeContent={setHomeContent} />}
    </HomePageContainer>
  );
}

export default HomePage;
