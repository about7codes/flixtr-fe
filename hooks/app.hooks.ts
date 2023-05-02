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
