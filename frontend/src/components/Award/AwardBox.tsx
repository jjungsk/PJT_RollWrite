import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  setAwardSteps: React.Dispatch<React.SetStateAction<number>>;
}

const AwardBox = ({ setAwardSteps }: Props) => {
  const controls = useAnimation();
  const [isShaking, setIsShaking] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 });
  });

  const handleShake = async () => {
    if (isShaking) return;

    setClickCount((prevClickCount) => prevClickCount + 1);

    setIsShaking(true);
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
    <motion.div
      animate={controls}
      onClick={handleShake}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 5,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 80,
          restDelta: 0.001,
        },
      }}
    >
      <img src="/box.png" width={280} alt="box" />
    </motion.div>
  );
};

export default AwardBox;
