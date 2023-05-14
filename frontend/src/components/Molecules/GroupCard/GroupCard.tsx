import React from "react";
import {
  GroupCardContainer,
  GroupCardContent,
  Title,
  SubTitle,
  HorizontalBtn,
  GroupCardFooter,
} from "./style";
import GroupTag from "../../Atom/Tag/Tag";
import { ReactComponent as Person } from "../../../assets/Person.svg";
import { Group } from "../../../constants/types";
import { useNavigate } from "react-router-dom";

interface Props {
  groupInfo?: Group;
  complete?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  setHomeContent?: React.Dispatch<React.SetStateAction<number>>;
  homeContent?: number;
}

function GroupCard({
  groupInfo,
  complete,
  width,
  height,
  margin,
  setHomeContent,
  homeContent,
}: Props) {
  const navigate = useNavigate();
  return (
    <GroupCardContainer
      width={width}
      height={height}
      margin={margin}
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

      <GroupCardContent>
        {groupInfo?.tag.map((tag, i) => (
          <GroupTag label={tag.content} key={i} />
        ))}
      </GroupCardContent>

      <HorizontalBtn>
        <Person />
        {groupInfo?.participantCnt}
      </HorizontalBtn>

      {!complete && (
        <GroupCardFooter>
          <div onClick={() => navigate(`/invite/${groupInfo?.meetingId}`)}>
            초대하기
          </div>
          {homeContent === 2 ? (
            <div onClick={() => setHomeContent?.(0)}>달력 보기</div>
          ) : (
            <div onClick={() => setHomeContent?.(2)}>참여자 보기</div>
          )}
        </GroupCardFooter>
      )}
    </GroupCardContainer>
  );
}

export default GroupCard;
