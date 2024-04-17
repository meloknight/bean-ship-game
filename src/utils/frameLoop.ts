import { useEffect, useRef } from "react";

const useFrameLoop = (callback: any) => {
  const requestID: any = useRef();
  const previousTime: any = useRef();
  const loop = (time: number) => {
    if (previousTime.current !== undefined) {
      const deltaTime = time - previousTime.current;
      callback(time, deltaTime);
    }
    previousTime.current = time;
    requestID.current = requestAnimationFrame(loop);
  };
  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestID.current);
  });
};

export { useFrameLoop };
