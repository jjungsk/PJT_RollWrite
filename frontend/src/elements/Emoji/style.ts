import styled from "styled-components";

const EmojiContainer = styled.div`
  font-family: "Tossface";
  height: 200px;
  width: 200px;
  line-height: 200px;
  font-size: 180px;
  text-align: center;
  margin: auto;

  @media (height < 700px) {
    height: 140px;
    width: 140px;
    line-height: 140px;
    font-size: 120px;
  }
`;

export { EmojiContainer };
