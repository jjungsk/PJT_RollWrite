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
import { GroupInfo, Profile } from "../../constants/types";
import Contour from "../../elements/Contour/Contour";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImg: "",
    ongoingGroupCnt: 0,
    completeGroupCnt: 0,
  });
  const [groupList, setGroupList] = useState<GroupInfo[]>([]);

  useEffect(() => {
    // TODO: 프로필 데이터 API 호출
    const profileData = {
      nickname: "내이름은닉네임이다앙",
      profileImg: "/sample_profile_image.png",
      ongoingGroupCnt: 4,
      completeGroupCnt: 6,
    };

    setProfile(profileData);

    // TODO: 참여한 모임 목록 API 호출
    const groupListData = [
      {
        meetingId: 1,
        title: "예찬이의 첫 모임",
        tag: [
          { tagId: 0, content: "고등학생" },
          { tagId: 2, content: "학생" },
        ],
        startDay: "2023-04-18",
        endDay: "2023-04-25",
        color: "var(--orange-color)",
        participant: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 2,
            nickname: "닉네임2",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 3,
            nickname: "닉네임3",
            profileImg: "/sample_profile_image.png",
          },
        ],
        participantCnt: 3,
        questionLimit: 3,
        questionUsage: 3,
      },
      {
        meetingId: 2,
        title: "싸피에서 즐거운 시간",
        tag: [
          { tagId: 1, content: "대학생" },
          { tagId: 2, content: "학생" },
          { tagId: 3, content: "취업" },
        ],
        startDay: "2022-07-06",
        endDay: "2023-04-26",
        color: "var(--blue-color)",
        participant: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 2,
            nickname: "닉네임2",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 3,
            nickname: "닉네임3",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 4,
            nickname: "닉네임4",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 5,
            nickname: "닉네임5",
            profileImg: "/sample_profile_image.png",
          },
        ],
        participantCnt: 5,
        questionLimit: 3,
        questionUsage: 3,
      },
      {
        meetingId: 3,
        title: "이건 완료한 모임이야",
        tag: [{ tagId: 3, content: "취업" }],
        startDay: "2023-04-20",
        endDay: "2023-04-25",
        color: "var(--yellow-color)",
        participant: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 2,
            nickname: "닉네임2",
            profileImg: "/sample_profile_image.png",
          },
        ],
        participantCnt: 2,
        questionLimit: 3,
        questionUsage: 3,
      },
      {
        meetingId: 4,
        title: "이건 완료한 모임이야",
        tag: [{ tagId: 2, content: "학생" }],
        startDay: "2023-04-23",
        endDay: "2023-04-25",
        color: "var(--green-color)",
        participant: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 2,
            nickname: "닉네임2",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 3,
            nickname: "닉네임3",
            profileImg: "/sample_profile_image.png",
          },
          {
            userId: 4,
            nickname: "닉네임4",
            profileImg: "/sample_profile_image.png",
          },
        ],
        participantCnt: 4,
        questionLimit: 3,
        questionUsage: 3,
      },
    ];

    setGroupList(groupListData);
  }, []);

  const handleClickGroup = (meetingId: number) => {
    navigate(`/result/${meetingId}`);
  };

  return (
    <div>
      <ProfileContainer style={{ backgroundImage: `url(${ProfileCard})` }}>
        <ProfileImg size={110} bgImg={profile.profileImg} />
        <ProfileInfo>
          <p>{profile.nickname}</p>
          <ProfileInfoDetail>
            <table>
              <tbody>
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
              </tbody>
            </table>
          </ProfileInfoDetail>
        </ProfileInfo>
      </ProfileContainer>

      <Contour text="참여한 모임" />

      <GroupListContainer>
        {groupList.map((group: GroupInfo) => (
          <div
            key={group.meetingId}
            onClick={() => handleClickGroup(group.meetingId)}
          >
            <GroupCard
              complete
              width="320px"
              height="90px"
              groupInfo={group}
              margin="16px auto"
            />
          </div>
        ))}
        <div></div>
      </GroupListContainer>
    </div>
  );
}

export default MyPage;
