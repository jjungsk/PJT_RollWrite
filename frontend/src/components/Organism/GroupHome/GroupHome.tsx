import React, { useEffect, useState } from "react";
import Calendar from "../../Molecules/Calendar/Calendar";
import { CalendarQuestion, Group } from "../../../constants/types";
import { getQuestionList } from "../../../apis/home";
import { ReactComponent as Arrow } from "../../../assets/Prev_Arrow.svg";

import {
  GroupHomeCard,
  GroupHomeCardContent,
  GroupHomeCardFooter,
  GroupHomeCardHeader,
} from "./style";
import { SPROUT_LIST } from "../../../constants/sprout";
import { format } from "date-fns";

interface Props {
  group: Group;
}
function GroupHome({ group }: Props) {
  const [questionMap, setQuestionMap] = useState<Map<string, CalendarQuestion>>(
    new Map()
  );
  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    getQuestionList(group.meetingId).then((res) => {
      const questionList = res.data;
      const newQuestionMap = new Map<string, CalendarQuestion>();
      // eslint-disable-next-line array-callback-return
      questionList.map((question: CalendarQuestion) => {
        newQuestionMap.set(question.day, question);
      });
      setQuestionMap(newQuestionMap);
    });
  }, [group.meetingId]);

  return (
    <>
      <Calendar
        group={group}
        questionMap={questionMap}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <GroupHomeCard>
        <GroupHomeCardHeader>
          답변률 (
          {questionMap.get(format(new Date(), "yyyy-MM-dd"))?.answerCnt ?? 0}/
          {questionMap.get(format(new Date(), "yyyy-MM-dd"))?.participantCnt ??
            0}
          )
        </GroupHomeCardHeader>
        <GroupHomeCardContent>
          {questionMap.has(format(new Date(), "yyyy-MM-dd")) ? (
            <>
              {
                SPROUT_LIST[
                  questionMap.get(format(new Date(), "yyyy-MM-dd"))?.rate! / 20
                ]
              }
              {questionMap.get(format(new Date(), "yyyy-MM-dd"))?.rate!}%가
              오늘의 질문에 답변했습니다.
            </>
          ) : (
            "오늘 질문에 답변부터 하세요"
          )}
        </GroupHomeCardContent>
        <GroupHomeCardFooter>
          {questionMap.has(format(new Date(), "yyyy-MM-dd")) ? (
            questionMap.get(format(new Date(), "yyyy-MM-dd"))?.rate !== 100 ? (
              <>
                답변하라고 조르기 <Arrow />
              </>
            ) : (
              <>
                자랑하기 +10p
                <Arrow />
              </>
            )
          ) : (
            <>
              답변하러 가기 <Arrow />
            </>
          )}
        </GroupHomeCardFooter>
      </GroupHomeCard>
      <GroupHomeCard>
        <GroupHomeCardHeader>
          {format(selectedDay, "yyyy년 MM월 dd일")}
        </GroupHomeCardHeader>
        <GroupHomeCardContent>
          {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.question ??
            "답변하지 않은 날은 답변을 뽑을 수 없습니다."}
        </GroupHomeCardContent>
        <GroupHomeCardFooter>
          {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.question && (
            <>
              답변 뽑기 -10p <Arrow />
            </>
          )}
        </GroupHomeCardFooter>
      </GroupHomeCard>
    </>
  );
}

export default GroupHome;
