import React from "react";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

import {
  QuestionOfDayContainer,
  QuestionOfDayHeader,
  QuestionOfDayContent,
  QuestionOfDayFooter,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import { GroupInfo } from "../../constants/types";
import { motion } from "framer-motion";

interface Props {
  pickedDay: Date;
  questionMap: Map<string, string>;
  groupInfo: GroupInfo;
  setHomeContent: React.Dispatch<React.SetStateAction<number>>;
}

function QuestionOfDay({
  pickedDay,
  groupInfo,
  questionMap,
  setHomeContent,
}: Props) {
  const variants = {
    hidden: { opacity: 1, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.2 }}
      variants={variants}
    >
      <QuestionOfDayContainer>
        <QuestionOfDayHeader>
          {format(pickedDay, "PPP", { locale: ko })}
        </QuestionOfDayHeader>
        <QuestionOfDayContent>
          {(isAfter(pickedDay, new Date(groupInfo.startDay)) &&
            isBefore(pickedDay, new Date(groupInfo.endDay))) ||
          isSameDay(pickedDay, new Date(groupInfo?.startDay))
            ? isAfter(pickedDay, new Date())
              ? "질문을 기다려라"
              : questionMap.has(format(pickedDay, "yyyy-MM-dd"))
              ? questionMap.get(format(pickedDay, "yyyy-MM-dd"))
              : isSameDay(pickedDay, new Date())
              ? "오늘 질문은 답변했냐?"
              : "답변안했네"
            : "모임기간이 아닙니다."}
        </QuestionOfDayContent>
        <QuestionOfDayFooter>
          <GhostBtn label={"질문 만들기"} onClick={() => setHomeContent(1)} />
        </QuestionOfDayFooter>
      </QuestionOfDayContainer>
    </motion.div>
  );
}

export default QuestionOfDay;
