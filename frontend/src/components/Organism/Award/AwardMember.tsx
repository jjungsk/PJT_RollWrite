import React from "react";
import { AwardPageContainer, AwardPageHeader } from "./style";
import { motion } from "framer-motion";
import { Profile } from "../../../constants/types";
import { pop, removeAll } from "../../../utils/pop";
import Btn from "../../Atom/Btn/Btn";
import { ProfileImg } from "../ProfileInfo/style";

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
  pop(100);
  const handelClickBtn = async () => {
    await removeAll();
    setAwardSteps(awardSteps + 1);
  };
  return (
    <AwardPageContainer>
      <AwardPageHeader>
        <div>{awardTitle}</div>
        <p>{profile.nickname}</p>
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
        style={{ margin: "56px 0px" }}
      >
        <ProfileImg size={280} bgImg={profile.profileImage} margin="auto" />
      </motion.div>
      <Btn label="확인" onClick={handelClickBtn}></Btn>
    </AwardPageContainer>
  );
}

export default AwardMember;
