import React, { useEffect, useState } from "react";

interface Props {
  targetValue: number;
  time: number;
}

export const PointAnimation = ({ targetValue, time }: Props) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const upValue = (targetValue / time) * 10;

    const timer = setInterval(() => {
      setValue((prevState) => {
        const newValue = prevState + upValue;
        if (newValue >= targetValue) {
          clearInterval(timer);
          return targetValue;
        }
        return newValue;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [targetValue, time]);

  return <>{Math.round(value)}</>;
};
