import { useEffect, useState } from "react";

const useMobile = () => {
  const [screenSize, setScreenSize] = useState<number | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize! <= 464) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenSize]);

  return { isMobile };
};

export default useMobile;
