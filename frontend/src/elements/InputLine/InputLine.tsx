import React from "react";
import { InputLineContainer, InputLineBox, InputLineBoxInput } from "./style";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  label?: string;
}
function InputLine({ Icon, onChange, name, type, label }: Props) {
  return (
    <InputLineContainer>
      <p>{label}</p>
      <InputLineBox>
        <InputLineBoxInput name={name} onChange={onChange} type={type} />
        {Icon && <Icon />}
      </InputLineBox>
    </InputLineContainer>
  );
}

export default InputLine;
