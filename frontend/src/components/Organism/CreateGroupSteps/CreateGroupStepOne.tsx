import React from "react";
import Info from "../../Molecules/EmojiTitleBtn/Info";

interface Props {
  onClick: () => void;
}

function CreateGroupStepOne({ onClick }: Props) {
  return (
    <Info
      emoji="👋"
      title="새로운 모임을"
      subTitle="생성하시겠어요?"
      ghostLabel="확인"
      ghostOnClick={onClick}
    />
  );
}

export default CreateGroupStepOne;
