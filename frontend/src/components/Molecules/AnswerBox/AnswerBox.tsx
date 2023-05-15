import React, { useEffect, useState } from "react";
import { AnswerContainer, AnswerContent, AnswerDetail } from "./style";
import { ProfileImg } from "../../../pages/MyPage/style";
import { getUserDetail } from "../../../apis/user";

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
  });
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
