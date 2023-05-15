import React from "react";
import { BtnContainer } from "./style";

interface Props {
  label: string;
  onClick?: () => void;
  color?: string;
  margin?: string;
}
function Btn({ label, onClick, color, margin }: Props) {
  return (
    <BtnContainer onClick={onClick} color={color} margin={margin}>
      {label}
    </BtnContainer>
  );
}

export default Btn;
