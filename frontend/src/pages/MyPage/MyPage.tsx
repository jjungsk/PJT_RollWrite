import React, { useEffect, useState } from "react";
import { MyPageTabContainer } from "./style";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { Group } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { getUserGroupIsDoneList } from "../../apis/user";
import GroupList from "../../components/Organism/GroupList/GroupList";
import { getGroupList } from "../../apis/home";
import Tabs from "../../components/Molecules/Tabs/Tabs";
import ProfileInfo from "../../components/Organism/ProfileInfo/ProfileInfo";

function MyPage() {
  const navigate = useNavigate();

  const menuTabList = ["진행중인 모임", "완료된 모임"];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const [groupList, setGroupList] = useState<Group[][]>([[], []]);

  useEffect(() => {
    getGroupList().then((res) => {
      setGroupList((prevState) => [res.data, prevState[1]]);
    });
    getUserGroupIsDoneList(0, 10).then((res) => {
      setGroupList((prevState) => [prevState[0], res.data]);
    });
  }, []);

  const handleClickGroup = (meetingId: number) => {
    switch (selectedMenuIndex) {
      case 0:
        navigate(`/group/${meetingId}`);
        break;
      case 1:
        navigate(`/result/${meetingId}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ProfileInfo />

      <MyPageTabContainer>
        <Tabs
          menuTabList={menuTabList}
          selectedMenuIndex={selectedMenuIndex}
          setSelectedMenuIndex={setSelectedMenuIndex}
        />
        <Plus
          onClick={() => {
            navigate("/create");
          }}
        />
      </MyPageTabContainer>

      <>
        {selectedMenuIndex === 0 && (
          <GroupList
            groupList={groupList[selectedMenuIndex]}
            handleClickGroup={handleClickGroup}
          />
        )}
        {selectedMenuIndex === 1 && (
          <GroupList
            groupList={groupList[selectedMenuIndex]}
            handleClickGroup={handleClickGroup}
          />
        )}
      </>
    </>
  );
}

export default MyPage;
