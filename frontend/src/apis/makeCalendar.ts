import {
  format,
  isSameDay,
  isSameMonth,
  addDays,
  startOfWeek,
  getWeeksInMonth,
  isAfter,
  isBefore,
} from "date-fns";
import { Question } from "../constants/types";
import { ko } from "date-fns/locale";

const DATE_WEEK_LENGTH = 7;
export const TODAY = new Date();

function generateOneWeek(
  dateStart: Date,
  monthStart: Date,
  questionList?: Question[],
  startDay?: string,
  endDay?: string
) {
  let map = new Map();
  questionList?.map((question) => {
    map.set(question.day, question.question);
    return 0;
  });

  const daysOfWeek = [];
  let currentDay = dateStart;

  for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
    const isPeriod =
      isAfter(currentDay, new Date(startDay!)) &&
      isBefore(currentDay, new Date(endDay!));
    const isToday = isSameDay(currentDay, TODAY);
    daysOfWeek.push({
      currentDay,
      formattedDate: format(currentDay, "d"),
      isToday: isToday,
      isCurrMonth: isSameMonth(currentDay, monthStart),
      isPeriod: isPeriod,
      sprout: map.has(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        ? Math.floor(Math.random() * 4) + 1
        : 0,
      question: map.has(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        ? map.get(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        : isToday
        ? "오늘 질문에 답변했나요? 🤓"
        : isPeriod
        ? isAfter(TODAY, currentDay)
          ? "답변을 하지 않아서 질문을 볼수가 없어요~😛"
          : "아직 질문이 공개되지 않았습니다.🤔"
        : "모임 기간이 아닙니다. ❌",
    });

    currentDay = addDays(currentDay, 1);
  }

  return daysOfWeek;
}

export function makeCalendar(
  monthStart: Date,
  questionList?: Question[],
  startDay?: string,
  endDay?: string
) {
  const weekLength = getWeeksInMonth(monthStart);
  const daysOfMonth = [];
  for (let i = 0; i < weekLength; i++) {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    const oneWeek = generateOneWeek(
      startDate,
      monthStart,
      questionList,
      startDay,
      endDay
    );
    daysOfMonth.push(oneWeek);
  }

  return daysOfMonth;
}
