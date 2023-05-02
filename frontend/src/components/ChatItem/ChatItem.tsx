import React from "react";
import { Chat } from "../../constants/types";
import {
  AnswerContainer,
  AnswerContent,
  AnswerDate,
  AnswerDetail,
  ChatContainer,
  QuestionContainer,
} from "./style";
import Contour from "../../elements/Contour/Contour";
import { format } from "date-fns";
import { ProfileImg } from "../../pages/MyPage/style";
import { ko } from "date-fns/locale";

function ChatItem(props: { chat: Chat; bgColor: string }) {
  return (
    <ChatContainer id={`question-${props.chat.questionId}`}>
      <Contour text={format(new Date(props.chat.day), "yy.MM.dd")} />
      <QuestionContainer bgColor={props.bgColor}>
        {props.chat.question}
      </QuestionContainer>
      {props.chat.answer.map((answer, idx) => (
        <AnswerContainer key={idx} isMe={answer.isMe}>
          {!answer.isMe && <ProfileImg size={40} bgImg={answer.profileImage} />}
          <AnswerDetail isMe={answer.isMe}>
            <div>{answer.nickname}</div>
            <div>
              {answer.isMe && (
                <AnswerDate>
                  {format(new Date(answer.time), "a", { locale: ko })}
                  <br />
                  {format(new Date(answer.time), "hh:mm")}
                </AnswerDate>
              )}
              <AnswerContent>{answer.content}</AnswerContent>
              {!answer.isMe && (
                <AnswerDate>
                  {format(new Date(answer.time), "a", { locale: ko })}
                  <br />
                  {format(new Date(answer.time), "hh:mm")}
                </AnswerDate>
              )}
            </div>
          </AnswerDetail>
          {answer.isMe && <ProfileImg size={40} bgImg={answer.profileImage} />}
        </AnswerContainer>
      ))}
    </ChatContainer>
  );
}

export default ChatItem;
