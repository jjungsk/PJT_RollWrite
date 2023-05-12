import React from "react";
import { ReactComponent as Tag } from "../../assets/Tag.svg";
import { TagContent, TagContainer } from "./style";
function GroupTag(props: { label: string }) {
  return (
    <TagContainer>
      <Tag style={{ width: "60px", height: "20px" }} />
      <TagContent>{props.label}</TagContent>
    </TagContainer>
  );
}

export default GroupTag;
