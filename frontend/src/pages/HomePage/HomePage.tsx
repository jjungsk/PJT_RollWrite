import React from "react";
import { HomePageContainer, Header, HeaderTitle } from "./style";
import useHomePage from "./useHomePage";
import PlusIcon from "../../assets/Plus.svg";
import GroupList from "../../components/GroupList/GroupList";
import HomeContent from "../../components/HomeContent/HomeContent";

function HomePage() {
  const {
    navigate,
    homeContent,
    setHomeContent,
    groupList,
    nowIndex,
    questionList,
    setNowIndex,
  } = useHomePage();

  return (
    <HomePageContainer>
      <Header>
        <HeaderTitle>
          <span>주대선</span> 님의 모임
        </HeaderTitle>
        <img
          src={PlusIcon}
          alt="plus"
          onClick={() => {
            navigate("/create");
          }}
        />
      </Header>

      <GroupList
        groupList={groupList}
        onIndexChanged={(index) => setNowIndex(index)}
      />

      <HomeContent
        homeContent={homeContent}
        setHomeContent={setHomeContent}
        questionList={questionList}
        group={groupList?.[nowIndex]}
      />
    </HomePageContainer>
  );
}

export default HomePage;
