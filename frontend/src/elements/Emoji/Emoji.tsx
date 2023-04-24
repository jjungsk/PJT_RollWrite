import React from "react";
import { EmojiContainer } from "./style";

function Emoji(props: { label: string }) {
  return <EmojiContainer>{props.label}</EmojiContainer>;
}

export default Emoji;
