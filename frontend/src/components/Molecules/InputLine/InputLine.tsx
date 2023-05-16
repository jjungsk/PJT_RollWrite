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
  readOnly?: boolean;
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
  readOnly,
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
          readOnly={readOnly}
        />

        {Icon && <Icon onClick={onClick} />}
      </InputLineBox>
      <InputLineInfo>{info}</InputLineInfo>
    </InputLineContainer>
  );
}

export default InputLine;
