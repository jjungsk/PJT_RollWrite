import React, { useEffect, useState, useRef } from "react";
import Calendar from "../../Molecules/Calendar/Calendar";
import { CalendarQuestion, Group } from "../../../constants/types";
import { getQuestionList, getRandomAnswer } from "../../../apis/home";
import { ReactComponent as Arrow } from "../../../assets/Prev_Arrow.svg";
import { ReactComponent as Download } from "../../../assets/Download.svg";
import { ReactComponent as InfoSvg } from "../../../assets/Info-circle.svg";
import {
  GroupHomeCard,
  GroupHomeCardContent,
  GroupHomeCardFooter,
  GroupHomeCardHeader,
} from "./style";
import { SPROUT_LIST } from "../../../constants/sprout";
import { format, getDay, subHours } from "date-fns";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { handleKakaoQuestionShare } from "../../../utils/kakaoShare";
import Modal from "../../Molecules/Modal/Modal";
import SproutList from "../../Molecules/SproutList/SproutList";
import AnswerBox from "../../Molecules/AnswerBox/AnswerBox";
import { toast } from "react-hot-toast";

interface Props {
  group: Group;
}
function GroupHome({ group }: Props) {
  const [questionMap, setQuestionMap] = useState<Map<string, CalendarQuestion>>(
    new Map()
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [answer, setAnswer] = useState("");
  const calendarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleDownloadClick = async () => {
    if (calendarRef.current) {
      const canvas = await html2canvas(calendarRef.current);
      const imgData = canvas.toDataURL("image/png");
      const filename = "calendar.png";

      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = imgData;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    }
  };

  const handelClickRandomAnswer = () => {
    getRandomAnswer(
      String(group.meetingId),
      format(selectedDay, "yyyy-MM-dd")
    ).then((res) => {
      console.log(res);
      if (res.statusCode === 400) toast.error(res.message);
      else {
        setAnswer(res.data.answer);
        toast.success(res.message);
      }
    });
  };

  return (
    <>
      {isOpen && (
        <Modal width="280px" height="128px" setIsOpen={setIsOpen} color="fill">
          <SproutList />
        </Modal>
      )}
      <div style={{ position: "relative" }}>
        <Download
          style={{ position: "absolute", right: "32px", top: "4px" }}
          onClick={handleDownloadClick}
        />
        <Calendar
          calendarRef={calendarRef}
          group={group}
          questionMap={questionMap}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>
      <GroupHomeCard>
        <GroupHomeCardHeader>
          답변률 (
          {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.answerCnt ?? 0}/
          {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.participantCnt ??
            0}
          )
          <InfoSvg onClick={() => setIsOpen(true)} />
        </GroupHomeCardHeader>
        <GroupHomeCardContent alignItem="center">
          {questionMap.has(format(selectedDay, "yyyy-MM-dd")) ? (
            <>
              {
                SPROUT_LIST[
                  questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.rate! / 20
                ]
              }
              {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.rate!}
              %가 오늘의 질문에 답변했습니다.
            </>
          ) : (
            "답변률은 질문에 답변한 날만 확인 할수 있습니다."
          )}
        </GroupHomeCardContent>
        <GroupHomeCardFooter>
          {questionMap.has(format(selectedDay, "yyyy-MM-dd")) ? (
            questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.rate !== 100 ? (
              getDay(selectedDay) === getDay(subHours(new Date(), 8)) ? (
                <div
                  onClick={() =>
                    handleKakaoQuestionShare(
                      questionMap.get(format(selectedDay, "yyyy-MM-dd"))!
                    )
                  }
                >
                  답변 요청하기 <Arrow />
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : getDay(selectedDay) === getDay(subHours(new Date(), 8)) ? (
            <div onClick={() => navigate("/question")}>
              답변하러 가기 <Arrow />
            </div>
          ) : (
            <></>
          )}
        </GroupHomeCardFooter>
      </GroupHomeCard>
      <GroupHomeCard>
        <GroupHomeCardHeader>
          {format(selectedDay, "yyyy년 MM월 dd일")}
        </GroupHomeCardHeader>
        <GroupHomeCardContent flexDirection="column" gap="0px">
          {questionMap.has(format(selectedDay, "yyyy-MM-dd")) ? (
            <>
              {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.question}
              <AnswerBox
                isMe={true}
                answer={
                  questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.answer ??
                  "답변이 없습니다"
                }
              />
            </>
          ) : (
            "답변하지 않은 날은 답변을 뽑을 수 없습니다."
          )}
          {answer.length > 0 && <AnswerBox isMe={false} answer={answer} />}
        </GroupHomeCardContent>
        <GroupHomeCardFooter>
          {questionMap.get(format(selectedDay, "yyyy-MM-dd"))?.question && (
            <div onClick={handelClickRandomAnswer}>
              답변 뽑기 -10p <Arrow />
            </div>
          )}
        </GroupHomeCardFooter>
      </GroupHomeCard>
    </>
  );
}

export default GroupHome;
