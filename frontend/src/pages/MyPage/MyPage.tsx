import React, { useEffect, useState } from "react";
import {
  GroupListContainer,
  ProfileContainer,
  ProfileImg,
  ProfileInfo,
  ProfileInfoDetail,
} from "./style";
import ProfileCard from "../../assets/Profile_Card.svg";
import { ReactComponent as Sprout } from "../../assets/Sprout_2.svg";
import { ReactComponent as Flower } from "../../assets/Flower.svg";
import { Profile } from "../../constants/types";
import Contour from "../../elements/Contour/Contour";
import NewGroupCard from "../../components/GroupCard/NewGroupCard";

function MyPage() {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImg: "",
    ongoingGroupCnt: 0,
    completeGroupCnt: 0,
  });

  useEffect(() => {
    // TODO: 프로필 데이터 API 호출
    const profileData = {
      nickname: "내이름은닉네임이다앙",
      profileImg: "/sample_profile_image.png",
      ongoingGroupCnt: 4,
      completeGroupCnt: 6,
    };

    setProfile(profileData);
  }, []);

  return (
    <div>
      <ProfileContainer style={{ backgroundImage: `url(${ProfileCard})` }}>
        <ProfileImg
          style={{ backgroundImage: "url(/sample_profile_image.png)" }}
        ></ProfileImg>
        <ProfileInfo>
          <p>{profile.nickname}</p>
          <ProfileInfoDetail>
            <table>
              <tr>
                <td>
                  <Sprout />
                </td>
                <td>진행 중인 모임</td>
                <td>{profile.ongoingGroupCnt}</td>
              </tr>
              <tr>
                <td>
                  <Flower />
                </td>
                <td>완료된 모임</td>
                <td>{profile.completeGroupCnt}</td>
              </tr>
            </table>
          </ProfileInfoDetail>
        </ProfileInfo>
      </ProfileContainer>

      <Contour text="참여한 모임"></Contour>

      <GroupListContainer>
        <NewGroupCard />
        <NewGroupCard />
        <NewGroupCard />
        <NewGroupCard />
        <NewGroupCard />
      </GroupListContainer>
    </div>
  );
}

export default MyPage;
