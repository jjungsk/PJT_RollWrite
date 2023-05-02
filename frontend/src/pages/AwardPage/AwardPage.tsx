import { useState } from "react";
import AwardStart from "../../components/Award/AwardStart";
import AwardMember from "../../components/Award/AwardMember";
import AwardEnd from "../../components/Award/AwardEnd";

function AwardPage() {
  const [awardSteps, setAwardSteps] = useState(-1);
  const [award, setAward] = useState<
    {
      userId: number;
      nickname: string;
      profileImage: string;
      type: string;
    }[]
  >([
    {
      userId: 1,
      nickname: "닉네임1",
      profileImage: "/sample_profile_image.png",
      type: "TALETELLER",
    },
    {
      userId: 2,
      nickname: "닉네임2",
      profileImage: "/sample_profile_image.png",
      type: "TALETELLER",
    },
    {
      userId: 1,
      nickname: "닉네임1",
      profileImage: "/sample_profile_image.png",
      type: "PHOTOGRAPHER",
    },
    {
      userId: 1,
      nickname: "닉네임1",
      profileImage: "/sample_profile_image.png",
      type: "PERFECTATTENDANCE",
    },
  ]);

  return (
    <div>
      {awardSteps === -1 && <AwardStart setAwardSteps={setAwardSteps} />}
      {award?.map((profile, i) => {
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
      {awardSteps === award.length && <AwardEnd award={award} />}
    </div>
  );
}

export default AwardPage;
