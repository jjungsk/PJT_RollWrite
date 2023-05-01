import React from "react";
import { AwardPageContainer, AwardPageHeader } from "./style";
import AwardBox from "./AwardBox";

interface Props {
  setAwardSteps: React.Dispatch<React.SetStateAction<number>>;
}
function Start({ setAwardSteps }: Props) {
  return (
    <AwardPageContainer padding="32px 32px">
      <AwardPageHeader>
        <div>싸피8기모임</div>
        <div>롤링페이퍼가 완성되었습니다!</div>
        <div>결과를 확인해보세요</div>
      </AwardPageHeader>
      <AwardBox setAwardSteps={setAwardSteps} />
    </AwardPageContainer>
  );
}

export default Start;
