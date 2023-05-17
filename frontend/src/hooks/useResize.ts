import React, { useEffect, useState } from "react";

function useResize() {
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    console.log(window.innerHeight);
    setHeight(window.innerHeight);
    document.getElementById("root")!.style.height = `${window.innerHeight}px`;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}

export default useResize;
