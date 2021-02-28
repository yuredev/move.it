import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

let countDownTimeout: NodeJS.Timeout; 
// total time in seconds
const TOTAL_TIME = 5;

export default function Countdown() {
  const [time, setTime] = useState(TOTAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  // padStart preenche a esquerda caso tenha menos de 2 caracteres
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(TOTAL_TIME);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [ isActive, time ]);

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
