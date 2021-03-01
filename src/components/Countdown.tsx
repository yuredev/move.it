import { useState, useEffect, useContext } from "react";
import styles from "../styles/components/Countdown.module.css";
import { ChalengesContext } from "../contexts/ChalengesContext";
import { CountdownContext } from "../contexts/CountdownContext";

export default function Countdown() {
  const { 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown, 
    minutes, 
    seconds 
  } = useContext(CountdownContext)
  // padStart preenche a esquerda caso tenha menos de 2 caracteres
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      
      { 
        hasFinished ? (
          <button
            disabled
            className={styles.countdownButton}
          >
            Cycle finished
          </button>
        ) : (
          isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.stopCountdownButton}`}
              onClick={resetCountdown}
            >
              Abandon cycle
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton} 
              onClick={startCountdown}  
            >
              Start a cycle
            </button>
          )
        )
      }
    </div>
  );
}
