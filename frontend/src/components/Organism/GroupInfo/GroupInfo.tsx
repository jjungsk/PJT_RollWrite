import React from "react";
import {
  GroupInfoCard,
  GroupInfoCardHeader,
  GroupInfoCardTagContainer,
} from "./style";
import { Group } from "../../../constants/types";
import { format } from "date-fns";
import ParticipantList from "../ParticipantList/ParticipantList";

interface Props {
  group: Group;
}
function GroupInfo({ group }: Props) {
  return (
    <>
      <GroupInfoCard>
        <GroupInfoCardHeader>모임 기간</GroupInfoCardHeader>
        <div>
          {format(new Date(group.startDay), "yyyy년 MM월 dd일")} ~{" "}
          {format(new Date(group.endDay), "yyyy년 MM월 dd일")}
        </div>
      </GroupInfoCard>
      <GroupInfoCard>
        <GroupInfoCardHeader>모임 태그</GroupInfoCardHeader>
        <GroupInfoCardTagContainer>
          {group.tag.map((t) => (
            <div key={t.tagId}>{t.content}</div>
          ))}
        </GroupInfoCardTagContainer>
      </GroupInfoCard>
      <GroupInfoCard>
        <GroupInfoCardHeader>모임 멤버</GroupInfoCardHeader>
        <div>
          <ParticipantList group={group} />
        </div>
      </GroupInfoCard>
    </>
  );
}

export default GroupInfo;
