import { useEffect, useRef, useState } from "react";
import { convertToDuration } from "../global/utils";

export default function useCountdownTimer(targetTime : any) {
  const intervalRef = useRef<Number>();
  const [currentTime, setCurrentTime] = useState(0);
  const timerShowed =
    targetTime > 0 && currentTime > 0 && currentTime <= targetTime;
  const duration = convertToDuration(currentTime, targetTime);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current= window.setInterval(
        () => setCurrentTime(Math.floor(new Date().getTime() / 1000)),
        1000
      );
    }
    return () => {
      clearInterval(Number(intervalRef.current));
    };
  }, []);

  useEffect(() => {
    if (targetTime > 0 && currentTime > 0 && currentTime > targetTime) {
      clearInterval(Number(intervalRef.current));
    }
  }, [targetTime, currentTime]);

  return {
    timerShowed,
    duration,
  };
}
