import React, { useEffect, useState } from "react";
import AccordionList from "../../elements/AccordionList/AccordionList";
import { AccordionItemType } from "../../constants/types";
import { NoticeContainer, NoticeContent, NoticeDay } from "./style";

function NoticePage() {
  const [noticeList, setNoticeList] = useState<AccordionItemType[]>([]);

  useEffect(() => {
    setNoticeList([
      {
        title: "RollWrite, 카카오에 매각됩니다",
        content: (
          <>
            <NoticeDay>2023.08.08 08:08</NoticeDay>
            <NoticeContent>
              안녕하세요 운영자입니다
              <br />
              저희 서비스가 카카오에 매각됩니다!!!
            </NoticeContent>
          </>
        ),
      },
      {
        title: "서비스 이용자 1만명 돌파",
        content: (
          <>
            <NoticeDay>2023.05.05 05:55</NoticeDay>
            <NoticeContent>
              안녕하세요 운영자입니다
              <br />
              저희 서비스 이용자가 벌써 1만명을 돌파하였습니다!!!
              <br />
              그래서 저희가 이벤트를 진행합니다.
              <br />
              추첨을 통해 1만명에게 1만원 상품권을 드립니다!!!
              <br />
              앞으로도 잘 부탁드립니다.
            </NoticeContent>
          </>
        ),
      },
      {
        title: "Rollwrite 출시",
        content: (
          <>
            <NoticeDay>2023.05.04 04:4</NoticeDay>
            <NoticeContent>
              안녕하세요 운영자입니다
              <br />
              Rollwrite가 출시되었습니다!
              <br />
              앞으로도 잘 부탁드립니다.
            </NoticeContent>
          </>
        ),
      },
    ]);
    // getNoticeList()
    //   .then((res) => {
    //   })
    //   .catch((error) => {
    //   });
  }, []);

  return (
    <NoticeContainer>
      <AccordionList items={noticeList} />;
    </NoticeContainer>
  );
}

export default NoticePage;
