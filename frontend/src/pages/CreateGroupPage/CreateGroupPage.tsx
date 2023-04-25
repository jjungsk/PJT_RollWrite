import React, { useState } from "react";
import Info from "../../components/Info/Info";
import { useNavigate } from "react-router-dom";
import {
  GroupInput,
  GroupNameContainer,
  GroupSelectTag,
  ThemaBox,
  ThemaSelect,
  Title,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";

function CreateGroupPage() {
  const navigate = useNavigate();
  const [createState, setCreateState] = useState(0);
  return (
    <>
      {createState === 0 && (
        <Info
          emoji="👋"
          title="새로운 모임을"
          subTitle="생성하시겠어요?"
          ghostLabel="확인"
          ghostOnClick={() => setCreateState(1)}
        />
      )}
      {createState === 1 && (
        <>
          <Title>
            <div>정보를 입력하고</div>
            <div> 아래 확인 버튼을 누르세요</div>
          </Title>

          <GroupNameContainer>
            <p>모임명</p>
            <GroupInput />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 시작일</p>
            <GroupInput type="date" />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 종료일</p>
            <GroupInput type="date" />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 테마</p>
            <ThemaSelect>
              <ThemaBox color="var(--orange-color)" />
              <ThemaBox color="var(--yellow-color)" />
              <ThemaBox color="var(--green-color)" />
              <ThemaBox color="var(--blue-color)" />
            </ThemaSelect>
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 태그</p>
            <GroupSelectTag />
          </GroupNameContainer>
          <GhostBtn label="확인" onClick={() => setCreateState(2)} />
        </>
      )}
      {createState === 2 && (
        <Info
          emoji="👏"
          title="자율 PJT 팀 가보자구"
          subTitle="모임을 만들었어요."
          fillLabel="초대하기"
          ghostLabel="홈으로"
          fillOnClick={() => setCreateState(0)}
          ghostOnClick={() => navigate("/home")}
        />
      )}
    </>
  );
}

export default CreateGroupPage;
