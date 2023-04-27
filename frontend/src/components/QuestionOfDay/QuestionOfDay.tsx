import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import {
  QuestionOfDayContainer,
  QuestionOfDayHeader,
  QuestionOfDayContent,
  QuestionOfDayFooter,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";

interface Props {
  pickedDay: Date;
  questionMap: Map<string, string>;
}

function QuestionOfDay({ pickedDay, questionMap }: Props) {
  return (
    <QuestionOfDayContainer>
      <QuestionOfDayHeader>
        {format(pickedDay, "PPP", { locale: ko })}
      </QuestionOfDayHeader>
      <QuestionOfDayContent>
        {questionMap.get(format(pickedDay, "yyyy-MM-dd"))}
      </QuestionOfDayContent>
      <QuestionOfDayFooter>
        <GhostBtn label={"질문 만들기"} />
      </QuestionOfDayFooter>
    </QuestionOfDayContainer>
  );
}

export default QuestionOfDay;
