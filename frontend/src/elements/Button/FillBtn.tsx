import React from "react";
import { FillBtn } from "./style";
function Button(props: { label: string }) {
  return <FillBtn>{props.label}</FillBtn>;
}

export default Button;
