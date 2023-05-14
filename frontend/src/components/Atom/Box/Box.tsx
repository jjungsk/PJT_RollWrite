import React from "react";
import { BoxContainer } from "./style";

interface Props {
  width: string;
  height: string;
}

function Box({ width, height }: Props) {
  return <BoxContainer width={width} height={height}></BoxContainer>;
}

export default Box;
