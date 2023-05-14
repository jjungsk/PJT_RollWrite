import React from "react";
import { BtnContainer } from "./style";

interface Props {
  label: string;
  onClick?: () => void;
  color?: string;
}
function Btn({ label, onClick, color }: Props) {
  return (
    <BtnContainer onClick={onClick} color={color}>
      {label}
    </BtnContainer>
  );
}

export default Btn;
