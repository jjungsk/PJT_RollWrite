import React from "react";
import { CreateGroup, Tag } from "../../constants/types";
import {
  CreateGroupStepsContainer,
  CreateGroupStepsContent,
  CreateGroupStepsHeader,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import SelectTag from "../../elements/SelectTag/SelectTag";

interface Props {
  onClick: () => void;
  groupInfo: CreateGroup;
  setGroupInfo: React.Dispatch<React.SetStateAction<CreateGroup>>;
  tagList: Tag[];
}

function CreateGroupStepThree({
  groupInfo,
  setGroupInfo,
  onClick,
  tagList,
}: Props) {
  const handleClickTagBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, name } = e.target as HTMLButtonElement;
    const { tag } = groupInfo;
    tag.includes(parseInt(value))
      ? setGroupInfo({
          ...groupInfo,
          [name]: tag.filter((item) => item !== parseInt(value)),
        })
      : tag.length > 3
      ? alert("최대 4개까지 가능합니다")
      : setGroupInfo({
          ...groupInfo,
          [name]: [...tag, parseInt(value)],
        });
    console.log(groupInfo);
  };

  return (
    <CreateGroupStepsContainer>
      <CreateGroupStepsHeader>
        <div>{groupInfo.title}은</div>
        <div> 어떤 모임인가요?</div>
        <p> 최대 4개를 선택할수 있습니다.</p>
      </CreateGroupStepsHeader>
      <CreateGroupStepsContent>
        <SelectTag
          onClick={handleClickTagBtn}
          tag={groupInfo.tag}
          tagList={tagList}
        />
        <GhostBtn label="확인" onClick={onClick} />
      </CreateGroupStepsContent>
    </CreateGroupStepsContainer>
  );
}

export default CreateGroupStepThree;
