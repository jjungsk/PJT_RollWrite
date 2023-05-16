import React, { useState } from "react";
import {
  ConfettiContainer,
  ConfettiPiece,
  ExplodeButton,
  generateKeyframes,
} from "./style";

interface Piece {
  id: number;
  color: string;
  animation: ReturnType<typeof generateKeyframes>;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  const handleClick = () => {
    const colors = [
      "#FF4136",
      "#FF851B",
      "#FFDC00",
      "#01FF70",
      "#0074D9",
      "#B10DC9",
    ];
    const newPieces = Array(10)
      .fill(null)
      .map(() => ({
        id: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        animation: generateKeyframes(),
      }));
    setPieces(newPieces);
  };
  return (
    <ConfettiContainer>
      <ExplodeButton onClick={handleClick}>팡파레 터뜨리기</ExplodeButton>
      {pieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          color={piece.color}
          animationCSS={piece.animation}
        />
      ))}
    </ConfettiContainer>
  );
};

export default Confetti;
