import React from "react";
import { AwardPageContainer, AwardPageContent, AwardPageHeader } from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import { ProfileImg } from "../../pages/MyPage/style";
import { useNavigate, useParams } from "react-router-dom";
interface Props {
  award: {
    userId: number;
    nickname: string;
    profileImg: string;
    type: string;
  }[];
}

function AwardEnd({ award }: Props) {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  let t: {
    userId: number;
    nickname: string;
    profileImg: string;
    type: string;
  }[] = [];
  let ph: {
    userId: number;
    nickname: string;
    profileImg: string;
    type: string;
  }[] = [];
  let pe: {
    userId: number;
    nickname: string;
    profileImg: string;
    type: string;
  }[] = [];
  award.map((profile) => {
    if (profile.type === "PHOTOGRAPHER") ph.push(profile);
    else if (profile.type === "PERFECTATTENDANCE") pe.push(profile);
    else t.push(profile);
    return 0;
  });
  return (
    <AwardPageContainer>
      <AwardPageHeader>명예의 전당 🏆</AwardPageHeader>
      이야기 보따리 📚
      <AwardPageContent>
        {t.map((profile) => {
          return <ProfileImg size={80} bgImg={profile.profileImg} />;
        })}
      </AwardPageContent>
      포토 그래퍼 📷
      <AwardPageContent>
        {ph.map((profile) => {
          return <ProfileImg size={80} bgImg={profile.profileImg} />;
        })}
      </AwardPageContent>
      프로 개근러 👍
      <AwardPageContent>
        {pe.map((profile) => {
          return <ProfileImg size={80} bgImg={profile.profileImg} />;
        })}
      </AwardPageContent>
      <GhostBtn
        label="결과 보러가기"
        onClick={() => {
          navigate(`/result/${meetingId}`);
        }}
      ></GhostBtn>
    </AwardPageContainer>
  );
}

export default AwardEnd;
