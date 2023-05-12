import React from "react";
import {
  NotifyCardContainer,
  NotifyCardContent,
  NotifyCardHeader,
} from "./style";
import { Notify } from "../../constants/types";

function NotifyCard(props: {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  notify: Notify;
}) {
  const title = [
    "",
    "📨 오늘의 질문이 도착했습니다.",
    "📢 공지사항 알림",
    "📌 답변에서 나를 언급했습니다.",
  ];
  return (
    <NotifyCardContainer
      width={props.width}
      height={props.height}
      padding={props.padding}
      margin={props.margin}
    >
      <NotifyCardHeader>
        <div>{title[props.notify.type]}</div>
        <div>2023.01.02</div>
      </NotifyCardHeader>
      <NotifyCardContent>
        <div>{props.notify.content}</div>
      </NotifyCardContent>
    </NotifyCardContainer>
  );
}

export default NotifyCard;
