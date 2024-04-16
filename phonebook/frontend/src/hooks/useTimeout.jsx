import { useEffect, useState } from "react";

const useTimeout = (callback, delay) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isRunning) {
      timeoutId = setTimeout(() => {
        callback();
        setIsRunning(false);
      }, delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay, isRunning]);

  const startTimeout = () => setIsRunning(true);
  const stopTimeout = () => setIsRunning(false);

  return { startTimeout, stopTimeout };
};

export default useTimeout;
