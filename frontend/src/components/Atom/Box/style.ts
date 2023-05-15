import styled, { css } from "styled-components";

interface Props {
  width: string;
  height: string;
}

const BoxContainer = styled.div<Props>`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `}
`;

export { BoxContainer };
