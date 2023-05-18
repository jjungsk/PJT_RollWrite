import React from "react";
import { AnswerContainer, AnswerContent, AnswerDetail } from "./style";
import { ProfileImg } from "../../Organism/ProfileInfo/style";
import { User } from "../../../pages/AdminPage/type";

interface Props {
  isMe: boolean;
  answer: string;
  imageUrl?: string;
  user?: User;
}
function AnswerBox({ isMe, answer, imageUrl, user }: Props) {
  return (
    <AnswerContainer isMe={isMe}>
      {!isMe && <ProfileImg size={40} bgImg={user?.profileImage ?? ""} />}
      <AnswerDetail isMe={isMe}>
        <div>{user?.nickname ?? "???"}</div>
        <div>
          <AnswerContent>
            {imageUrl && <img src={imageUrl} alt="" />}
            <div>{answer}</div>
          </AnswerContent>
        </div>
      </AnswerDetail>
      {isMe && <ProfileImg size={40} bgImg={user?.profileImage} />}
    </AnswerContainer>
  );
}

export default AnswerBox;
