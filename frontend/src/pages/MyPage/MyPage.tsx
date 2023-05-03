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
import { GroupInfo } from "../../constants/types";
import Contour from "../../elements/Contour/Contour";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useNavigate } from "react-router-dom";
import { getUserGroupIsDoneList } from "../../apis/user";
import useProfile from "../../hooks/useProfile";

function MyPage() {
  const navigate = useNavigate();
  const profile = useProfile();
  const [groupList, setGroupList] = useState<GroupInfo[]>([]);

  useEffect(() => {
    getUserGroupIsDoneList(0, 10)
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClickGroup = (meetingId: number) => {
    navigate(`/result/${meetingId}`);
  };

  return (
    <div>
      <ProfileContainer style={{ backgroundImage: `url(${ProfileCard})` }}>
        <ProfileImg size={110} bgImg={profile.profileImage} />
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
                  <td>{profile.cntMeetingIs}</td>
                </tr>
                <tr>
                  <td>
                    <Flower />
                  </td>
                  <td>완료된 모임</td>
                  <td>{profile.cntMeetingIsDone}</td>
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
              width="calc(100% - 60px)"
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
