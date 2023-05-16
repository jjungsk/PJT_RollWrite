import React, { useEffect, useState } from "react";
import { AnswerContainer, AnswerContent, AnswerDetail } from "./style";
import { getUserDetail } from "../../../apis/user";
import { ProfileImg } from "../../Organism/ProfileInfo/style";

interface Props {
  isMe: boolean;
  answer: string;
}
function AnswerBox({ isMe, answer }: Props) {
  const [user, setUser] = useState({ nickname: "???", ProfileImg: "" });
  useEffect(() => {
    isMe &&
      getUserDetail().then((res) => {
        setUser(res.data);
      });
  }, [isMe]);
  return (
    <AnswerContainer isMe={isMe}>
      {!isMe && <ProfileImg size={40} bgImg={user.ProfileImg} />}
      <AnswerDetail isMe={isMe}>
        <div>{user.nickname}</div>
        <div>
          <AnswerContent>
            <div>{answer}</div>
          </AnswerContent>
        </div>
      </AnswerDetail>
      {isMe && <ProfileImg size={40} bgImg={user.ProfileImg} />}
    </AnswerContainer>
  );
}

export default AnswerBox;
