import React from "react";
import GroupTag from "../../elements/GroupTag/GroupTag";
import GhostBtn from "../../elements/Button/GhostBtn";
import FillBtn from "../../elements/Button/FillBtn";
import Emoji from "../../elements/Emoji/Emoji";

function MainPage() {
  return (
    <div>
      <GroupTag label="친구" />
      <GroupTag label="프로젝트" />
      <GroupTag label="가나다라마바사" />
      <GhostBtn label="질문하기" />
      <FillBtn label="질문하기" />
      <Emoji label="😀" />
      <Emoji label="✍" />
      <Emoji label="🎉" />
      <Emoji label="🍖" />
    </div>
  );
}

export default MainPage;
