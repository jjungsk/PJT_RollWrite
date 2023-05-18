import React, { useState } from "react";
import { ReactComponent as PresentBox } from "../../assets/Box.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import Box from "../../components/Atom/Box/Box";
import Tabs from "../../components/Molecules/Tabs/Tabs";
import {
  ManualContainer,
  ManualImg,
  ManualStep,
  ManualStepBox,
  ManualStepText,
  ManualSubTitle,
  ManualWrap,
} from "./style";
import {
  BackNavigationContainer,
  BackNavigationTitle,
} from "../../components/Organism/BackNavigation/style";
import { useNavigate } from "react-router-dom";

function ManualPage() {
  const navigate = useNavigate();
  const menuTabList = ["소개", "생성/초대", "모임", "질문/답변", "결과"];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

  return (
    <ManualWrap>
      <BackNavigationContainer>
        <Home width="32px" height="32px" onClick={() => navigate("/")} />
        <BackNavigationTitle>서비스 소개</BackNavigationTitle>
        <Box width="32px" height="32px" />
      </BackNavigationContainer>
      <Tabs
        menuTabList={menuTabList}
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={setSelectedMenuIndex}
      />
      <ManualContainer>
        {selectedMenuIndex === 0 && (
          <>
            <Logo />
            <ManualSubTitle>
              Rollwrite는 여러분이 모인
              <br />
              모든 순간을 영원히 간직할 수 있는
              <br />
              롤링페이퍼 플랫폼입니다
            </ManualSubTitle>
            <PresentBox />
            <ManualStepBox>
              <ManualStep>규칙 1. </ManualStep>
              <ManualStepText>
                <div>매일 아침 8시에 올라오는 질문에 답변해주세요</div>
                <div>
                  (질문은 우리 모임에 맞게 자동 생성 되며 질문 추가도 가능해요)
                </div>
              </ManualStepText>
            </ManualStepBox>
            <ManualStepBox>
              <ManualStep>규칙 2. </ManualStep>
              <ManualStepText>
                <div>답변을 달지 않으면 우리의 추억이 공유되지 않아요</div>
                <div>(다음날 질문이 올라오기 전까지 답변을 달아주세요)</div>
              </ManualStepText>
            </ManualStepBox>
            <ManualStepBox>
              <ManualStep>규칙 3. </ManualStep>
              <ManualStepText>
                <div>모든 답변은 모임의 마지막 날 확인 가능해요</div>
                <div>(마지막 날 우리 모임의 선물이 될 거예요^^)</div>
              </ManualStepText>
            </ManualStepBox>
          </>
        )}
        {selectedMenuIndex !== 0 && (
          <ManualImg
            src={`/manual_step_${selectedMenuIndex}_bg.png`}
            alt="manualImage"
          />
        )}
        {selectedMenuIndex === 1 && (
          <ManualStepBox>
            <ManualStep>Step 1. </ManualStep>
            <ManualStepText>
              "프로필" 안에 "+" 버튼을 클릭해서 우리들만의 모임을
              <br />
              만들고 친구를 초대 해주세요
            </ManualStepText>
          </ManualStepBox>
        )}
        {selectedMenuIndex === 2 && (
          <ManualStepBox>
            <ManualStep>Step 2. </ManualStep>
            <ManualStepText>
              "모임 상세보기"에서 모임 기간, 모임 멤버, 답변률 등
              <br />
              다양한 정보를 확인할 수 있어요
              <div>
                * 답변 뽑기 : 10point를 사용해 무작위으로 답변 확인 가능해요
              </div>
            </ManualStepText>
          </ManualStepBox>
        )}
        {selectedMenuIndex === 3 && (
          <ManualStepBox>
            <ManualStep>Step 3. </ManualStep>
            <ManualStepText>
              "홈" 화면 또는 "모임 상세보기"를 클릭해서 답변을
              <br />
              달아주세요 (10point가 적립 돼요)
              <br />+ 모임 상세에서 "질문 하기"를 클릭해서 우리
              <br />
              친구들에게 궁금한 점을 질문 해주세요
            </ManualStepText>
          </ManualStepBox>
        )}
        {selectedMenuIndex === 4 && (
          <ManualStepBox>
            <ManualStep>Step 4. </ManualStep>
            <ManualStepText>
              모임의 마지막 우리의 소중한 추억을 확인해 보세요^^
              <br />
              <div>(마지막 답변을 달지 않으면 롤링페이퍼가 보이지 않아요)</div>
              <div>
                + "선물 상자"를 클릭하면 모임 결과 이벤트를 다시
                <br />볼 수 있어요~!
              </div>
            </ManualStepText>
          </ManualStepBox>
        )}

        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            width: 1,
            height: 1,
          }}
        >
          <img
            style={{ width: 1, height: 1 }}
            src={`/manual_step_1_bg.png`}
            alt="manualImage"
          />
          <img
            style={{ width: 1, height: 1 }}
            src={`/manual_step_2_bg.png`}
            alt="manualImage"
          />
          <img
            style={{ width: 1, height: 1 }}
            src={`/manual_step_3_bg.png`}
            alt="manualImage"
          />
          <img
            style={{ width: 1, height: 1 }}
            src={`/manual_step_4_bg.png`}
            alt="manualImage"
          />
        </div>
      </ManualContainer>
    </ManualWrap>
  );
}

export default ManualPage;
