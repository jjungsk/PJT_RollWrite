import React, { useEffect, useState } from "react";
import AccordionList from "../../elements/AccordionList/AccordionList";
import { AccordionItemType, Notice } from "../../constants/types";
import { NoticeContainer, NoticeContent, NoticeDay } from "./style";
import { getNoticeList } from "../../apis/notification";

function NoticePage() {
  const [noticeList, setNoticeList] = useState<AccordionItemType[]>([]);

  useEffect(() => {
    getNoticeList().then((res) => {
      const list: AccordionItemType[] = res.data.map((notice: Notice) => {
        return {
          title: notice.title,
          content: (
            <>
              <NoticeDay>{notice.createdAt?.split("T")[0]}</NoticeDay>
              <NoticeContent>{notice.content}</NoticeContent>
            </>
          ),
        };
      });
      setNoticeList(list);
    });
  }, []);

  return (
    <NoticeContainer>
      <AccordionList items={noticeList} />
    </NoticeContainer>
  );
}

export default NoticePage;
