import styled, { css } from "styled-components";

interface Props {
  imgSrc?: string;
  size?: string;
}

const EmojiContainer = styled.div<Props>`
  ${({ imgSrc, size }) => css`
    font-family: "Tossface";
    height: ${size || "200px"};
    width: ${size || "200px"};
    line-height: ${size || "200px"};
    font-size: ${size || "180px"};
    text-align: center;
    border-radius: 8px;
    background-image: url(${imgSrc});
    background-size: cover;
    background-position: center;
    margin: auto;
  `}
`;

export { EmojiContainer };
