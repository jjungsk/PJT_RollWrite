import React, { useState } from "react";
import Tabs from "../../components/Molecules/Tabs/Tabs";

function ManualPage() {
  const menuTabList = ["기본", "생성/초대", "질문/답변", "모임", "결과"];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

  return (
    <div style={{ backgroundColor: "white", height: "100%" }}>
      <Tabs
        menuTabList={menuTabList}
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={setSelectedMenuIndex}
      />
      {selectedMenuIndex === 0 && (
        <>
          <div>
            Rollwrite는
            <br />
            여러분이 모인 모든 순간을
            <br />
            영원히 간직할 수 있는 롤링페이퍼 플랫폼입니다
          </div>
          <div>
            <div>규칙 1. </div>
            <div>
              매일 아침 8시에 올라오는 질문에 답변해주세요
              <br />
              (질문은 우리 모임에 맞게 자동 생성 되며 질문 추가도 가능해요)
            </div>
          </div>
          <div>
            <div>규칙 2. </div>
            <div>
              답변을 달지 않으면 우리의 추억이 공유되지 않아요ㅠ-ㅠ
              <br />
              (다음날 질문이 올라오기 전까지 답변을 달아주세요)
            </div>
          </div>
          <div>
            <div>규칙 3. </div>
            <div>
              모든 답변은 모임의 마지막 날 확인 가능해요
              <br />
              (마지막 날 우리 모임의 선물이 될거에요^^)
            </div>
          </div>
        </>
      )}
      {selectedMenuIndex !== 0 && (
        <img
          src={`/manual_step_${selectedMenuIndex}.png`}
          alt="manualImage"
          style={{ width: "calc(100% - 20px)", margin: "auto" }}
        />
      )}
      {selectedMenuIndex === 1 && (
        <>
          <div>
            <div>Step 1. </div>
            <div>
              "프로필" 안에 "+" 버튼을 클릭해서 우리들만의 모임을 만들고 친구를
              초대 해주세요
            </div>
          </div>
        </>
      )}
      {selectedMenuIndex === 2 && (
        <>
          <div>
            <div>Step 2. </div>
            <div>
              "홈" 화면 또는 "모임 상세보기"를 클릭해서 답변을 달아주세요
              (10point가 적립 돼요)
              <br />+ 모임 상세에서 "질문 하기"를 클릭해서 우리 친구들에게
              궁금한 점을 질문 해주세요
            </div>
          </div>
        </>
      )}
      {selectedMenuIndex === 3 && (
        <>
          <div>
            <div>Step 3. </div>
            <div>
              "모임 상세보기"에서 다양한 정보를 확인할 수 있어요
              <br />
              * 답변률, 모임 기간, 모임 멤버 등
              <br />* 답변 뽑기 : 10point를 사용해 무작위으로 답변 확인 가능해요
            </div>
          </div>
        </>
      )}
      {selectedMenuIndex === 4 && (
        <>
          <div>
            <div>Step 4. </div>
            <div>
              모임의 마지막 우리의 소중한 추억을 확인해 보세요^^
              <br />
              (마지막 답변을 달지 않으면 롤링페이퍼가 보이지 않아요)
              <br />+ "선물 상자"를 클릭하면 모임 결과 이벤트를 다시 볼 수
              있어요~!
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManualPage;
