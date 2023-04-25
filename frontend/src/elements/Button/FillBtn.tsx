import React from "react";
import { FillBtn } from "./style";
function Button(props: { label: string; onClick?: () => void }) {
  return <FillBtn onClick={props.onClick}>{props.label}</FillBtn>;
}

export default Button;
