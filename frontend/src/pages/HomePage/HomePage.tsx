import React from "react";
import { HomePageContainer, HomePageHeader } from "./style";
import useHomePage from "./useHomePage";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { ReactComponent as Info } from "../../assets/Info-circle.svg";
import GroupList from "../../components/GroupList/GroupList";
import HomeContent from "../../components/HomeContent/HomeContent";
import useProfile from "../../hooks/useProfile";
import { Profile } from "../../constants/types";

function HomePage() {
  const {
    navigate,
    homeContent,
    setHomeContent,
    groupList,
    currentIndex,
    questionList,
    setCurrentIndex,
  } = useHomePage();
  const profile: Profile = useProfile();
  return (
    <HomePageContainer>
      <HomePageHeader>
        <div>
          <span>{profile.nickname}</span> 님의 모임
          <Info />
        </div>
        <Plus
          onClick={() => {
            navigate("/create");
          }}
        />
      </HomePageHeader>

      <GroupList
        groupList={groupList}
        onIndexChanged={(index) => setCurrentIndex(index)}
        setHomeContent={setHomeContent}
        homeContent={homeContent}
      />

      {groupList && questionList && (
        <HomeContent
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          questionList={questionList}
          groupInfo={groupList[currentIndex]}
        />
      )}

      {groupList.length === 0 && <div>모임이없습니다</div>}
    </HomePageContainer>
  );
}

export default HomePage;
