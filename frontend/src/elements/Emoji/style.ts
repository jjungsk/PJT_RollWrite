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
    height: 140px;
    width: 140px;
    line-height: 140px;
    font-size: 120px;
  }
`;

export { EmojiContainer };
