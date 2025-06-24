import { useEffect } from "react";

export const ImagePreloader = (srcList = []) => {
  useEffect(() => {
    srcList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [srcList]);
};
