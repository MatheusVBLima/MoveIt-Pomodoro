import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isRunning: boolean;
  handleStartCountdown: () => void;
  handleResetCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function handleStartCountdown() {
    setIsRunning(true);
  }

  function handleResetCountdown() {
    clearTimeout(countdownTimeout);
    setIsRunning(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isRunning && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setHasFinished(true);
      setIsRunning(false);
      startNewChallenge();
    }
  }, [isRunning, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isRunning,
        handleStartCountdown,
        handleResetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
