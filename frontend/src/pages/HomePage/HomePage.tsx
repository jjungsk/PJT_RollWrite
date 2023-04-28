import React from "react";
import { HomePageContainer, HomePageHeader } from "./style";
import useHomePage from "./useHomePage";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
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
      <HomePageHeader>
        <div>
          <span>주대선</span> 님의 모임
        </div>
        <Plus
          onClick={() => {
            navigate("/create");
          }}
        />
      </HomePageHeader>

      <GroupList
        groupList={groupList}
        onIndexChanged={(index) => setNowIndex(index)}
      />

      {groupList && questionList && (
        <HomeContent
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          questionList={questionList}
          groupInfo={groupList[nowIndex]}
        />
      )}
    </HomePageContainer>
  );
}

export default HomePage;
