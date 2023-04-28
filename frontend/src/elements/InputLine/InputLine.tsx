import React from "react";
import { InputLineContainer, InputLineBox, InputLineBoxInput } from "./style";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  label?: string;
  value?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}
function InputLine({
  Icon,
  onChange,
  name,
  type,
  label,
  value,
  onClick,
}: Props) {
  return (
    <InputLineContainer>
      <p>{label}</p>
      <InputLineBox>
        {value !== undefined ? (
          <InputLineBoxInput
            name={name}
            onChange={onChange}
            type={type}
            value={value}
            disabled
          />
        ) : (
          <InputLineBoxInput name={name} onChange={onChange} type={type} />
        )}
        {Icon && <Icon onClick={onClick} />}
      </InputLineBox>
    </InputLineContainer>
  );
}

export default InputLine;
