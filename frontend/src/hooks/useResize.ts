import { useEffect } from "react";

function useResize() {
  const handleResize = () => {
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
