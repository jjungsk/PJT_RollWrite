import React from "react";
import { ReactComponent as TagSvg } from "../../../assets/Tag.svg";
import { TagContent, TagContainer } from "./style";
function Tag(props: { label: string }) {
  return (
    <TagContainer>
      <TagSvg style={{ width: "60px", height: "20px" }} />
      <TagContent>{props.label}</TagContent>
    </TagContainer>
  );
}

export default Tag;
