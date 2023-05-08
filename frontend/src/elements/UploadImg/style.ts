import styled, { css } from "styled-components";

const UploadImgContainer = styled.div<{ BgImg: string }>`
  display: flex;
  width: 300px;
  height: 20vh;
  margin: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #7a7e80;
  border-radius: 10px;
  position: relative;
  background-color: rgb(0, 0, 0, 0.4);
  background-position: center;
  ${(props: any) =>
    props.BgImg &&
    css`
      background-image: url(${props.BgImg});
      background-size: cover;
      background-position: center;
    `}

  & > svg {
    height: 60px;
    width: 60px;
  }
`;

export { UploadImgContainer };
