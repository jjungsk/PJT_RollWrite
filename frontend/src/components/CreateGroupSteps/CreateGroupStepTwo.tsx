import React from "react";
import {
  CreateGroupStepsContainer,
  CreateGroupStepsHeader,
  CreateGroupStepsContent,
} from "./style";
import InputLine from "../../elements/InputLine/InputLine";
import { CreateGroup } from "../../constants/types";
import SelectThema from "../../elements/SelectThema/SelectThema";
import GhostBtn from "../../elements/Button/GhostBtn";
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
    console.log(groupInfo);
  };

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
        />
        <InputLine
          label="모임 시작일"
          name="startDay"
          onChange={handleChangeGroupInfo}
          type="date"
        />
        <InputLine
          label="모임 종료일"
          name="endDay"
          onChange={handleChangeGroupInfo}
          type="date"
        />
        <SelectThema color={groupInfo.color} onClick={handleChangeGroupInfo} />
        <GhostBtn label="확인" onClick={onClick} />
      </CreateGroupStepsContent>
    </CreateGroupStepsContainer>
  );
}

export default CreateGroupStepTwo;
