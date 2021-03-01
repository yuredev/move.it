import { createContext, Context, ReactNode, useState, useEffect, useContext } from "react";
import { ChalengesContext } from "./ChalengesContext";

interface ICountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ICountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as  ICountdownContextData);
// total time in seconds
const TOTAL_TIME = 5;
let countDownTimeout: NodeJS.Timeout; 

export function CountdownProvider({ children }: ICountdownProviderProps) {
  const [time, setTime] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const { startNewChalenge } = useContext(ChalengesContext);
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  
  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChalenge();
    }
  }, [ isActive, time ]);


  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(TOTAL_TIME);
  }

  const state = {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  }

  return (
    <CountdownContext.Provider value={state}>
      {children}
    </CountdownContext.Provider>
  );
}
