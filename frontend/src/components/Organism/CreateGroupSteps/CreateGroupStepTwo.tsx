import React from "react";
import {
  CreateGroupStepsContainer,
  CreateGroupStepsHeader,
  CreateGroupStepsContent,
} from "./style";
import InputLine from "../../Molecules/InputLine/InputLine";
import { CreateGroup } from "../../../constants/types";
import SelectThema from "../../Molecules/SelectThema/SelectThema";
import { addDays } from "date-fns";
import Btn from "../../Atom/Btn/Btn";
interface Props {
  onClick: () => void;
  groupInfo: CreateGroup;
  setGroupInfo: React.Dispatch<React.SetStateAction<CreateGroup>>;
}

function CreateGroupStepTwo({ groupInfo, setGroupInfo, onClick }: Props) {
  const handleChangeGroupInfo = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { value, name } = e.target as HTMLInputElement;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };

  const today = new Date();
  const minDay = addDays(new Date(groupInfo.startDay), 2);
  const maxDay = addDays(new Date(groupInfo.startDay), 30);
  const todayString = today.toISOString().substring(0, 10);
  const minDayString = minDay.toISOString().substring(0, 10);
  const maxDayString = maxDay.toISOString().substring(0, 10);
  return (
    <CreateGroupStepsContainer>
      <CreateGroupStepsHeader>
        <div>정보를 입력하고</div>
        <div>아래 확인 버튼을 누르세요</div>
      </CreateGroupStepsHeader>
      <CreateGroupStepsContent>
        <InputLine
          label="모임 이름"
          name="title"
          onChange={handleChangeGroupInfo}
          placeholder="모임 이름을 최대 24자입니다."
          value={groupInfo.title}
        />
        <InputLine
          label="모임 시작일"
          name="startDay"
          onChange={handleChangeGroupInfo}
          type="date"
          min={todayString}
          value={groupInfo.startDay}
        />
        <InputLine
          label="모임 종료일"
          name="endDay"
          onChange={handleChangeGroupInfo}
          type="date"
          min={minDayString}
          max={maxDayString}
          value={groupInfo.endDay}
          info={
            groupInfo.endDay.length > 0
              ? undefined
              : "모임 기간은 최소 3일입니다."
          }
        />
        <SelectThema color={groupInfo.color} onClick={handleChangeGroupInfo} />
        <Btn label="확인" onClick={onClick} />
      </CreateGroupStepsContent>
    </CreateGroupStepsContainer>
  );
}

export default CreateGroupStepTwo;
