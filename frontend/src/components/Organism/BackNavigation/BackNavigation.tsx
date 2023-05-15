import React from "react";
import { ReactComponent as Back } from "../../../assets/Back.svg";
import { BackNavigationContainer, BackNavigationTitle } from "./style";
import Box from "../../Atom/Box/Box";
import { useNavigate } from "react-router-dom";

interface Props {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  title?: string;
  titleSize?: string;
  justifyContent?: string;
}
function BackNavigation({ onClick, title, justifyContent, titleSize }: Props) {
  const navigate = useNavigate();

  return (
    <BackNavigationContainer justifyContent={justifyContent}>
      <Back onClick={onClick ? onClick : () => navigate(-1)} />
      <BackNavigationTitle fontSize={titleSize}>{title}</BackNavigationTitle>
      <Box width="32px" height="32px" />
    </BackNavigationContainer>
  );
}

export default BackNavigation;
