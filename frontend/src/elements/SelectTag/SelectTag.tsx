import React from "react";
import { Tag } from "../../constants/types";
import { SelectTagBtn, SelectTagContainer } from "./style";

interface Props {
  tagList: Tag[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  tag: number[];
}
function SelectTag({ tagList, onClick, tag }: Props) {
  return (
    <SelectTagContainer>
      {tagList.map((tagListTag) => (
        <SelectTagBtn
          key={tagListTag.tagId}
          name="tag"
          value={tagListTag.tagId}
          onClick={onClick}
          isTagged={tag.includes(tagListTag.tagId)}
        >
          {tagListTag.content}
        </SelectTagBtn>
      ))}
    </SelectTagContainer>
  );
}
export default SelectTag;
