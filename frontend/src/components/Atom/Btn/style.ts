import styled, { css } from "styled-components";

interface Props {
  color?: string;
}

const BtnContainer = styled.button<Props>`
  ${({ color }) => css`
    border: 2px solid
      ${color === "fill" ? "var(--main-color)" : "var(--darkgray-color)"};
    background-color: ${color === "fill" ? "var(--main-color)" : ""};
    color: ${color === "fill" ? "var(--white-color)" : "var(--darkgray-color)"};
    border-radius: 8px;
    width: 128px;
    height: 48px;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;

    @media (height < 700px) {
      font-size: 16px;
      width: 112px;
      height: 40px;
    }
  `}
`;

export { BtnContainer };
