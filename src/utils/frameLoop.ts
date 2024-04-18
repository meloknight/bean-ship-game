import { useEffect, useRef } from "react";
import { previousTimeType } from "../types";

const useFrameLoop = (callback: any) => {
  const requestID: any = useRef();
  const previousTime: previousTimeType = useRef<number>();
  const loop = (time: number) => {
    if (previousTime.current !== undefined) {
      const deltaTime: number = time - previousTime.current;
      callback(time, deltaTime);
    }
    previousTime.current = time;
    requestID.current = requestAnimationFrame(loop);
  };
  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestID.current);
  }, []);
};

export { useFrameLoop };
