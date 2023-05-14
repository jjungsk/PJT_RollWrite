import React from "react";
import { Notify } from "../../constants/types";
import NotifyCardList from "../../components/Organism/NotifyCardList/NotifyCardList";

function NotifyPage() {
  const notifyList: Notify[] = [
    {
      id: 1,
      type: 1,
      content:
        "자율 PJT 팀 가보자구의 마지막 답변을 남기고 결과를 확인해보세요!",
    },
    {
      id: 2,
      type: 2,
      content: "사용자 100만 이벤트",
    },
    {
      id: 3,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
    {
      id: 4,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
    {
      id: 5,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
    {
      id: 6,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
    {
      id: 7,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
    {
      id: 8,
      type: 3,
      content: "자율 PJT 팀 가보자구 에서 나를 10명멘션했습니다.",
    },
  ];

  return (
    <div>
      <NotifyCardList notifyList={notifyList} />
    </div>
  );
}

export default NotifyPage;
