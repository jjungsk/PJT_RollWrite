import React from "react";
import { AwardPageContainer, AwardPageHeader } from "./style";
import AwardBox from "./AwardBox";

interface Props {
  setAwardSteps: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}
function Start({ setAwardSteps, title }: Props) {
  return (
    <AwardPageContainer padding="32px 32px">
      <AwardPageHeader>
        <div>{title}</div>
        <div>롤링페이퍼가 완성되었습니다!</div>
        <div>결과를 확인해보세요</div>
      </AwardPageHeader>
      <AwardBox setAwardSteps={setAwardSteps} />
    </AwardPageContainer>
  );
}

export default Start;
