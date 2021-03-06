import { createContext, useState, ReactNode, useEffect } from "react";
import chalenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

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
  closeLevelUpModal: () => void;
}

interface IChalengesProviderProps {
  children: ReactNode;
  level: number;
  currentXp: number;
  chalengesCompleted: number;
}

export const ChalengesContext = createContext({} as IChalengesContextData);

export function ChalengesProvider({ children, ...rest }: IChalengesProviderProps) {
  // o ?? funciona igual o ||
  // caso não exista coloca o valor a direita
  // só tem no TypeScript
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const [chalengesCompleted, setChalengesCompleted ] = useState(rest.chalengesCompleted ?? 0);
  const [activeChalenge, setActiveChalenge] = useState(null as IChalenge);
  const [levelUpModalIsOpen, setLevelUpModalIsOpen] = useState(false);

  const XP_FACTOR = 4;
  // forma de calcular o xp para o próx nivel muti usado em rpgs
  const experienceToNextLevel = ((level + 1) * XP_FACTOR) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", level.toString());
    Cookies.set("currentXp", currentXp.toString());
    Cookies.set("chalengesCompleted", chalengesCompleted.toString());
  }, [level, currentXp, chalengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
  }

  function completeChalenge() {
    if (activeChalenge) {
      const { amount } = activeChalenge;
      let finalXp = currentXp + amount;
      if (finalXp >= experienceToNextLevel) {
        levelUp();
        setLevelUpModalIsOpen(true);
        new Audio("/level-up.mp3").play();
        finalXp = finalXp - experienceToNextLevel;
      }
      setCurrentXp(finalXp);
      setActiveChalenge(null);
      setChalengesCompleted(chalengesCompleted + 1);
    }
  }

  function closeLevelUpModal() {
    setLevelUpModalIsOpen(false);
  }

  function startNewChalenge() {
    const randomChalengeIndex = Math.trunc(Math.random() * chalenges.length);
    const chalenge: IChalenge = chalenges[randomChalengeIndex];
    setActiveChalenge(chalenge);

    // dispara notificação se estiver permitida
    if (Notification.permission === "granted") {
      new Audio("/notification.mp3").play();
      new Notification("Novo desafio", {
        body: `Valendo ${chalenge.amount}xp!`,
      });
    }
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
    closeLevelUpModal,
  }

  return (
    <ChalengesContext.Provider value={state}>
      { children }
      { levelUpModalIsOpen && <LevelUpModal />}
    </ChalengesContext.Provider>
  );
}
