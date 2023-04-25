import React from "react";
import { GhostBtn } from "./style";
function Button(props: { label: string; onClick?: () => void }) {
  return <GhostBtn onClick={props.onClick}>{props.label}</GhostBtn>;
}

export default Button;
