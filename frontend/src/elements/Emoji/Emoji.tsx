import React from "react";
import { EmojiContainer } from "./style";

function Emoji(props: { label: string; imgSrc?: string }) {
  return (
    <EmojiContainer imgSrc={`https://k8a508.p.ssafy.io/${props.imgSrc}`}>
      {props.imgSrc ? <></> : props.label}
    </EmojiContainer>
  );
}

export default Emoji;
