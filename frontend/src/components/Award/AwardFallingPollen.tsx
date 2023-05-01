import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as Pollen1 } from "../../assets/Pollen1.svg";
import { ReactComponent as Pollen2 } from "../../assets/Pollen2.svg";
import { ReactComponent as Pollen3 } from "../../assets/Pollen3.svg";
interface FallingSVG {
  id: number;
  type: number;
  delay: number;
  left: string;
}

const generateFallingSVGs = (count: number): FallingSVG[] => {
  const svgArray: FallingSVG[] = [];
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 3) + 1; // Random type between 1 and 3
    const delay = Math.random() * 2; // Random delay between 0 and 2 seconds
    const left = `${Math.random() * 100}%`; // Random left position between 0 and 100%
    svgArray.push({ id: i, type, delay, left });
  }
  return svgArray;
};

const AwardFallingPollen: React.FC = () => {
  const [fallingSVGs, setFallingSVGs] = useState<FallingSVG[]>([]);

  useEffect(() => {
    setFallingSVGs(generateFallingSVGs(50));
  }, []);

  return (
    <>
      {fallingSVGs.map((fallingSVG) => (
        <motion.div
          key={fallingSVG.id}
          initial={{ translateY: "-100%", rotateX: -90, opacity: 1 }}
          animate={{
            translateY: "100vh",
            rotateX: [0, Math.random() * 90], // Random value between 0 and 360 for rotateX
            rotateY: [0, Math.random() * 90],
            transition: {
              delay: fallingSVG.delay,
              duration: 3, // Increase the duration to make the fading effect slower
              ease: "easeIn",
              loop: Infinity, // Add loop property to make the animation repeat infinitely
            },
          }}
          style={{ position: "absolute", top: 0, left: fallingSVG.left }}
        >
          {fallingSVG.type === 1 && <Pollen1 />}
          {fallingSVG.type === 2 && <Pollen2 />}
          {fallingSVG.type === 3 && <Pollen3 />}
        </motion.div>
      ))}
    </>
  );
};

export default AwardFallingPollen;
