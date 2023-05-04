import React, { useEffect, useState } from "react";
import AccordionList from "../../elements/AccordionList/AccordionList";
import { AccordionItemType } from "../../constants/types";

function NoticePage() {
  const [noticeList, setNoticeList] = useState<AccordionItemType[]>([]);

  useEffect(() => {
    setNoticeList([
      {
        title: "RollWrite, 카카오에 매각됩니다",
        content: (
          <div>
            <div>2023.08.08 08:08</div>
            <div>
              안녕하세요 운영자입니다
              <br />
              저희 서비스가 카카오에 매각됩니다!!!
            </div>
          </div>
        ),
      },
      {
        title: "서비스 이용자 1만명 돌파",
        content: (
          <div>
            <div>2023.05.05 05:55</div>
            <div>
              안녕하세요 운영자입니다
              <br />
              저희 서비스 이용자가 벌써 1만명을 돌파하였습니다!!!
              <br />
              그래서 저희가 이벤트를 진행합니다.
              <br />
              추첨을 통해 1만명에게 1만원 상품권을 드립니다!!!
              <br />
              앞으로도 잘 부탁드립니다.
            </div>
          </div>
        ),
      },
      {
        title: "Rollwrite 출시",
        content: (
          <div>
            <div>2023.05.04 04:4</div>
            <div>
              안녕하세요 운영자입니다
              <br />
              Rollwrite가 출시되었습니다!
              <br />
              앞으로도 잘 부탁드립니다.
            </div>
          </div>
        ),
      },
    ]);
    // getNoticeList()
    //   .then((res) => {
    //   })
    //   .catch((error) => {
    //   });
  }, []);

  return <AccordionList items={noticeList} />;
}

export default NoticePage;
