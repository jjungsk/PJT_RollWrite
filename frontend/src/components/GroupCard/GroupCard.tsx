import React from "react";
import {
  GroupCardContainer,
  GroupCardContent,
  Title,
  SubTitle,
  HorizontalBtn,
  GroupCardFooter,
} from "./style";
import GroupTag from "../../elements/GroupTag/GroupTag";
import { ReactComponent as Person } from "../../assets/Person.svg";
import { GroupInfo } from "../../constants/types";
import { useNavigate } from "react-router-dom";

interface Props {
  groupInfo?: GroupInfo;
  width?: string;
  margin?: string;
}

function GroupCard({ groupInfo }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <GroupCardContainer color={groupInfo?.color}>
        <div>
          <Title>
            <div>{groupInfo?.title}</div>
          </Title>
          <SubTitle>
            {groupInfo?.startDay}~{groupInfo?.endDay}
          </SubTitle>
        </div>
        <GroupCardContent>
          {groupInfo?.tag.map((tag, i) => (
            <GroupTag label={tag.content} key={i} />
          ))}
        </GroupCardContent>

        <HorizontalBtn>
          <Person />
          {groupInfo?.participantCnt}
        </HorizontalBtn>
        <GroupCardFooter>
          <div onClick={() => navigate(`/invite/${groupInfo?.meetingId}`)}>
            초대하기
          </div>
          <div onClick={() => navigate(`/invite/${groupInfo?.meetingId}`)}>
            참여자 보기
          </div>
        </GroupCardFooter>
      </GroupCardContainer>
    </>
  );
}

export default GroupCard;
