import React from "react";
import { ProfileItem } from "../SideMenu/style";
import { Group } from "../../../constants/types";
import { ProfileImg } from "../../../pages/MyPage/style";

interface Props {
  group: Group;
}

function ParticipantList({ group }: Props) {
  return (
    <>
      {group.participant.map((item) => {
        return (
          <ProfileItem key={item.userId}>
            <ProfileImg size={50} bgImg={item.profileImage} />
            {item.nickname}
          </ProfileItem>
        );
      })}
    </>
  );
}

export default ParticipantList;
