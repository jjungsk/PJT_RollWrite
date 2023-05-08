import React from "react";
import ContourLine from "../../assets/Contour_Line.svg";
import { ContourContainer } from "./style";

function Contour(props: { text: string }) {
  return (
    <ContourContainer style={{ backgroundImage: `url(${ContourLine})` }}>
      {props.text}
    </ContourContainer>
  );
}

export default Contour;
