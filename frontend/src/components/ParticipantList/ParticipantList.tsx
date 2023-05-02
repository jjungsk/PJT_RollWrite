import React from "react";
import { ParticipantListContainer } from "./style";
import { ProfileItem } from "../SideMenu/style";
import { GroupInfo } from "../../constants/types";
import { ProfileImg } from "../../pages/MyPage/style";

interface Props {
  groupInfo: GroupInfo;
}

function ParticipantList({ groupInfo }: Props) {
  return (
    <ParticipantListContainer>
      {groupInfo.participant.map((item) => {
        return (
          <ProfileItem key={item.userId}>
            <ProfileImg size={40} bgImg={item.profileImage} />
            {item.nickname}
          </ProfileItem>
        );
      })}
    </ParticipantListContainer>
  );
}

export default ParticipantList;
