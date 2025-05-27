import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const scrollableArea = document.querySelector(
      ".mantine-ScrollArea-viewport"
    );
    if (scrollableArea) {
      scrollableArea.scrollTop = 0;
    }
  }, [location]);
};

export default useScrollToTop;
