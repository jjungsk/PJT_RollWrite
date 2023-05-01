import React from "react";
import { AwardPageContainer, AwardPageHeader } from "./style";
import { motion } from "framer-motion";
import { ProfileImg } from "../../pages/MyPage/style";
import GhostBtn from "../../elements/Button/GhostBtn";
import { Profile } from "../../constants/types";
import AwardFallingPollen from "./AwardFallingPollen";

interface Props {
  profile: Profile;
  setAwardSteps: React.Dispatch<React.SetStateAction<number>>;
  awardSteps: number;
  awardTitle: string;
}

function AwardMember({
  profile,
  setAwardSteps,
  awardSteps,
  awardTitle,
}: Props) {
  return (
    <AwardPageContainer>
      <AwardPageHeader>
        <div>{profile.nickname}</div>
        <div>{awardTitle}</div>
        <div>로 선정되었습니다!</div>
      </AwardPageHeader>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 5,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 80,
            restDelta: 0.001,
          },
        }}
      >
        <ProfileImg size={280} bgImg={profile.profileImg} />
      </motion.div>
      <GhostBtn
        label="확인"
        onClick={() => setAwardSteps(awardSteps + 1)}
      ></GhostBtn>
      <AwardFallingPollen />
    </AwardPageContainer>
  );
}

export default AwardMember;
