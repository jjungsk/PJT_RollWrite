import React from "react";
import { GhostBtn } from "./style";
function Button(props: { label: string }) {
  return <GhostBtn>{props.label}</GhostBtn>;
}

export default Button;
