import React from "react";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { BackNavigationContainer, BackNavigationTitle } from "./style";

interface Props {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  title?: string;
}
function BackNavigation({ onClick, title }: Props) {
  return (
    <BackNavigationContainer>
      <Back onClick={onClick} />
      <BackNavigationTitle>{title}</BackNavigationTitle>
      <div />
    </BackNavigationContainer>
  );
}

export default BackNavigation;
