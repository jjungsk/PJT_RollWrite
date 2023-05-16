import styled, { css } from "styled-components";

interface Props {
  width: string;
  height: string;
  color?: string;
}

const BoxContainer = styled.div<Props>`
  ${({ width, height, color }) => css`
    width: ${width};
    height: ${height};
    background-color: ${color};
  `}
`;

export { BoxContainer };
