import React from "react";
import { EmojiContainer } from "./style";

function Emoji(props: { label: string; imgSrc?: string; size?: string }) {
  return (
    <EmojiContainer imgSrc={props.imgSrc} size={props.size}>
      {props.imgSrc ? <></> : props.label}
    </EmojiContainer>
  );
}

export default Emoji;
