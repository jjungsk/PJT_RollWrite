import React from "react";
import {
  SelectThemaBox,
  SelectThemaBoxContainer,
  SelectThemaContainer,
} from "./style";
import { ReactComponent as Check } from "../../../assets/Check.svg";

interface Props {
  color: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function SelectThema({ color, onClick }: Props) {
  return (
    <SelectThemaContainer>
      <p>모임 테마</p>
      <SelectThemaBoxContainer>
        <SelectThemaBox
          color="var(--orange-color)"
          name="color"
          onClick={onClick}
          value="#FFD4B2"
        >
          {color === "#FFD4B2" && <Check />}
        </SelectThemaBox>
        <SelectThemaBox
          color="var(--yellow-color)"
          name="color"
          onClick={onClick}
          value="#FFF6BD"
        >
          {color === "#FFF6BD" && <Check />}
        </SelectThemaBox>
        <SelectThemaBox
          color="var(--green-color)"
          name="color"
          onClick={onClick}
          value="#CEEDC7"
        >
          {color === "#CEEDC7" && <Check />}
        </SelectThemaBox>

        <SelectThemaBox
          color="var(--blue-color)"
          name="color"
          onClick={onClick}
          value="#D1D9F8"
        >
          {color === "#D1D9F8" && <Check />}
        </SelectThemaBox>
      </SelectThemaBoxContainer>
    </SelectThemaContainer>
  );
}

export default SelectThema;
