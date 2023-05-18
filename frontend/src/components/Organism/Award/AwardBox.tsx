import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { pop, render } from "../../../utils/pop";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/141145-gift-box.json";

interface Props {
  setAwardSteps: React.Dispatch<React.SetStateAction<number>>;
}

const AwardBox = ({ setAwardSteps }: Props) => {
  const controls = useAnimation();
  const [isShaking, setIsShaking] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    pop(1);
    setTimeout(render, 700);
  }, []);
  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 });
  });

  const handleShake = async () => {
    if (isShaking) return;

    setClickCount((prevClickCount) => prevClickCount + 1);

    setIsShaking(true);
    // 쏘기
    pop(30);
    //
    await controls.start({
      rotate: [-10, 10, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    setIsShaking(false);

    if (clickCount === 2) {
      setAwardSteps(0);
      return;
    }
  };

  return (
    <motion.div animate={controls} onClick={handleShake}>
      {/* <img src="/box.png" width={280} alt="box" /> */}
      <Player
        autoplay
        keepLastFrame
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </motion.div>
  );
};

export default AwardBox;
