import { createContext, useState, ReactNode } from "react";
import chalenges from "../../challenges.json";

interface IChalenge {
  type: string;
  description: string;
  amount: number;
}

interface IChalengesContextData {
  level: number;
  currentXp: number;
  chalengesCompleted: number;
  levelUp: () => void;
  startNewChalenge: () => void;
  activeChalenge: IChalenge;
  resetChalenge: () => void;
  completeChalenge: () => void;
  experienceToNextLevel: number;
}

interface IChalengesProviderProps {
  children: ReactNode;
}

export const ChalengesContext = createContext({} as IChalengesContextData);

export function ChalengesProvider({ children }: IChalengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [chalengesCompleted, setChalengesCompleted ] = useState(0);
  const [activeChalenge, setActiveChalenge] = useState(null as IChalenge);

  const XP_FACTOR = 4;
  const experienceToNextLevel = ((level + 1) * XP_FACTOR) ** 2;

  function levelUp() {
    setLevel(level + 1);
  }

  function completeChalenge() {
    if (activeChalenge) {
      const { amount } = activeChalenge;
      let finalXp = currentXp + amount;
      if (finalXp >= experienceToNextLevel) {
        levelUp();
        finalXp = finalXp - experienceToNextLevel;
      }
      setCurrentXp(finalXp);
      setActiveChalenge(null);
      setChalengesCompleted(chalengesCompleted + 1);
    }
  }

  function startNewChalenge() {
    const randomChalengeIndex = Math.trunc(Math.random() * chalenges.length);
    const chalenge: IChalenge = chalenges[randomChalengeIndex];
    setActiveChalenge(chalenge);
  }

  function resetChalenge() {
    setActiveChalenge(null);
  }

  const state = {
    level,
    levelUp,
    currentXp,
    chalengesCompleted,
    startNewChalenge,
    activeChalenge,
    experienceToNextLevel,
    resetChalenge,
    completeChalenge,
  }

  return (
    <ChalengesContext.Provider value={state}>
      { children }
    </ChalengesContext.Provider>
  );
}
