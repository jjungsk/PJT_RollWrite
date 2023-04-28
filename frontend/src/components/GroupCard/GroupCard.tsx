import React from "react";
import {
  CardContainer,
  TagContainer,
  Title,
  SubTitle,
  HorizontalBtn,
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

function GroupCard({ groupInfo, width, margin }: Props) {
  const navigate = useNavigate();
  return (
    <CardContainer
      width={width !== undefined ? width : ""}
      margin={margin != undefined ? margin : "8px 20px 12px"}
      color={groupInfo?.color}
    >
      <div>
        <Title>
          <div>{groupInfo?.title}</div>
        </Title>
        <SubTitle>
          {groupInfo?.startDay}~{groupInfo?.endDay}
        </SubTitle>
      </div>
      <TagContainer>
        {groupInfo?.tag.map((tag, i) => (
          <GroupTag label={tag.content} key={i} />
        ))}
      </TagContainer>

      <HorizontalBtn>
        <Person />
        {groupInfo?.participantCnt}
      </HorizontalBtn>
      <div onClick={() => navigate(`/invite/${groupInfo?.meetingId}`)}>
        초대하기
      </div>
    </CardContainer>
  );
}

export default GroupCard;
