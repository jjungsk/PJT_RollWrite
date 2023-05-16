import React from "react";
import { BoxContainer } from "./style";

interface Props {
  color?: string;
  width: string;
  height: string;
}

function Box({ width, height, color }: Props) {
  return (
    <BoxContainer width={width} height={height} color={color}></BoxContainer>
  );
}

export default Box;
