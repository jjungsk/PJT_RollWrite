import styled from "styled-components";

const EmojiCarouselContainer = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (height < 700px) {
    height: 220px;
  }
`;

export { EmojiCarouselContainer };
