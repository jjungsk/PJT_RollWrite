import React from "react";
import {
  InputLineContainer,
  InputLineBox,
  InputLineBoxInput,
  InputLineInfo,
} from "./style";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  label?: string;
  value?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  min?: string;
  max?: string;
  placeholder?: string;
  info?: string;
}
function InputLine({
  Icon,
  onChange,
  name,
  type,
  label,
  value,
  onClick,
  min,
  max,
  placeholder,
  info,
}: Props) {
  return (
    <InputLineContainer>
      <p>{label}</p>
      <InputLineBox>
        <InputLineBoxInput
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          type={type}
          min={min}
          max={max}
          value={value}
        />

        {Icon && <Icon onClick={onClick} />}
      </InputLineBox>
      <InputLineInfo>{info}</InputLineInfo>
    </InputLineContainer>
  );
}

export default InputLine;
