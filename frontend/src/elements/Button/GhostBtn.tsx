import React from "react";
import { GhostBtn } from "./style";
function Button(props: {
  label: string;
  onClick?: () => void;
  margin?: string;
}) {
  return (
    <GhostBtn onClick={props.onClick} margin={props.margin}>
      {props.label}
    </GhostBtn>
  );
}

export default Button;
