import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useCustomRedirect = () => {
  const router = useRouter();

  const customRedirect = (pagePath: string) => {
    router.push(pagePath);
    return;
  };

  return {
    customRedirect,
  };
};

type UseMaxHeightReturnType = [number, React.MutableRefObject<any>];
// Returns component height in px numbers
export const useMaxHeight = (): UseMaxHeightReturnType => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const ref = React.useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onResize = () => {
      // @ts-ignore
      const elementHeight = ref.current.getBoundingClientRect().height;
      const newHeight = Math.floor(elementHeight / 10) * 10;
      if (newHeight !== maxHeight) {
        setMaxHeight(newHeight);
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [maxHeight]);

  return [maxHeight, ref];
};

// returns isMobile true if viewport is less than 900px
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      setIsMobile(width < 900);
    };
    handleResize(); // set initial state on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// returns true if NextJS page is loading
export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading;
};

export const scrollToTop = () => {
  const navElement = document.getElementById("app-nav");
  if (navElement) {
    navElement.scrollIntoView();
  }
};
