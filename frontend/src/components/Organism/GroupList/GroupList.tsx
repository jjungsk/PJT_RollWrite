import React from "react";
import GroupCard from "../../Molecules/GroupCard/GroupCard";
import { Group } from "../../../constants/types";
import { GroupListContainer } from "./style";
import Box from "../../Atom/Box/Box";
import Btn from "../../Atom/Btn/Btn";
import { useNavigate } from "react-router-dom";

interface Props {
  groupList?: Group[];
  handleClickGroup: (meetingId: number) => void;
}

function GroupList({ groupList, handleClickGroup }: Props) {
  const navigate = useNavigate();
  return (
    <GroupListContainer>
      {groupList && groupList?.length > 0 ? (
        groupList?.map((group: Group) => (
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
        ))
      ) : (
        <>
          <Box height="15vh" width="100%" />
          <div
            style={{ fontSize: "20px", fontWeight: "bold", lineHeight: "28px" }}
          >
            모임이 없습니다. <br />
          </div>
        </>
      )}
    </GroupListContainer>
  );
}

export default GroupList;
