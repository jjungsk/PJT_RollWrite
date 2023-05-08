import styled, { keyframes } from "styled-components";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const generateKeyframes = () => {
  const startX = random(0, 100);
  const endX = startX + random(-10, 10);
  const endY = 100;
  return keyframes`
    0% {
      opacity: 1;
      transform: translate(${startX}vw, 0%);
    }
    100% {
      opacity: 0;
      transform: translate(${endX}vw, ${endY}%);
    }
  `;
};

const ConfettiContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

interface ConfettiPieceProps {
  color: string;
  animationCSS: ReturnType<typeof generateKeyframes>;
}

const ConfettiPiece = styled.div<ConfettiPieceProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  animation: ${({ animationCSS }) => animationCSS} 2s linear infinite;
`;

const ExplodeButton = styled.button`
  /* 원하는 버튼 스타일을 여기에 추가하세요. */
`;

export { ConfettiContainer, ConfettiPiece, ExplodeButton, generateKeyframes };
