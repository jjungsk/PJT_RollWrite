import { useState } from "react";
import AwardStart from "../../components/Award/AwardStart";
import AwardMember from "../../components/Award/AwardMember";
import AwardEnd from "../../components/Award/AwardEnd";
import useGroupIsDoneResultAward from "../../hooks/useGroupIsDoneResultAward";
import { useParams } from "react-router-dom";

function AwardPage() {
  const [awardSteps, setAwardSteps] = useState(-1);
  const { meetingId } = useParams();
  const { award, resData, groupResult } = useGroupIsDoneResultAward(
    Number(meetingId)
  );
  return (
    <div>
      {awardSteps === -1 && (
        <AwardStart title={groupResult.title} setAwardSteps={setAwardSteps} />
      )}
      {resData?.map((profile, i) => {
        return (
          awardSteps === i && (
            <AwardMember
              key={i}
              profile={profile}
              awardSteps={awardSteps}
              awardTitle={
                profile.type === "TALETELLER"
                  ? "이야기 보따리📚"
                  : profile.type === "PHOTOGRAPHER"
                  ? "포토그래퍼 📷"
                  : "프로 개근러👍"
              }
              setAwardSteps={setAwardSteps}
            />
          )
        );
      })}
      {awardSteps === resData.length && <AwardEnd award={award} />}
    </div>
  );
}

export default AwardPage;
