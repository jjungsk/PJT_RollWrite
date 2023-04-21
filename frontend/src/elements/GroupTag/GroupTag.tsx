import React from "react";
import { ReactComponent as Tag } from "../../assets/Tag.svg";
import { TagContent, TagContainer } from "./style";
function GroupTag(props: { label: string }) {
  return (
    <TagContainer>
      <Tag />
      <TagContent>{props.label}</TagContent>
    </TagContainer>
  );
}

export default GroupTag;
