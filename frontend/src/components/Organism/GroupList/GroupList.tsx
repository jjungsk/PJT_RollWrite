import React from "react";
import GroupCard from "../../Molecules/GroupCard/GroupCard";
import { Group } from "../../../constants/types";
import { GroupListContainer } from "./style";

interface Props {
  groupList?: Group[];
  handleClickGroup: (meetingId: number) => void;
}

function GroupList({ groupList, handleClickGroup }: Props) {
  // TODO: 삭제하기
  console.log(groupList);
  return (
    <GroupListContainer>
      {groupList?.map((group: Group) => (
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
  );
}

export default GroupList;
