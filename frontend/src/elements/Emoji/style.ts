import styled, { css } from "styled-components";

const EmojiContainer = styled.div<{ imgSrc?: string }>`
  font-family: "Tossface";
  height: 200px;
  width: 200px;
  border-radius: 8px;
  line-height: 200px;
  font-size: 180px;
  text-align: center;
  margin-inline: auto;
  ${(props) =>
    props.imgSrc &&
    css`
      background-image: url(${props.imgSrc});
      background-size: cover;
    `}

  @media (height < 700px) {
    height: 160px;
    width: 160px;
    line-height: 160px;
    font-size: 160px;
  }
`;

export { EmojiContainer };
