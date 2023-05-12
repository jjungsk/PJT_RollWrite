import React from "react";
import { NavBtnContainer, NavBtn, NavBtnLabel } from "./style";

function FooterBtn(props: {
  isClicked?: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  onClick: () => void;
}) {
  return props.label ? (
    <NavBtnContainer>
      <NavBtn isClicked={props.isClicked} onClick={props.onClick}>
        <props.icon
          fill={props.isClicked ? "white" : "var(--darkgray-color)"}
        />
      </NavBtn>
      <NavBtnLabel isClicked={props.isClicked}>{props.label}</NavBtnLabel>
    </NavBtnContainer>
  ) : (
    <NavBtn onClick={props.onClick}>
      <props.icon fill="var(--darkgray-color)" />
    </NavBtn>
  );
}

export default FooterBtn;
