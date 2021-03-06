import React, { useContext } from "react";
import styles from "../styles/components/ChalengeBox.module.css";
import { ChalengesContext } from "../contexts/ChalengesContext";
import { CountdownContext } from "../contexts/CountdownContext";

export default function ChalengeBox() {
  // forma de consumir o contexto
  // assim como no dart é
  // Provider.of(context)...
  const { activeChalenge, resetChalenge, completeChalenge } = useContext(ChalengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChalengeSucceeded() {
    completeChalenge();
    resetCountdown();
  }
 
  function handleChalengeFailed() {
    resetChalenge();
    resetCountdown();
  }

  return (
    <div className={styles.chalengeBoxContainer}>
      {
        activeChalenge ? (
          <div className={styles.chalengeActive}>
            <header>Gain {activeChalenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChalenge.type}.svg`} alt=""/>
              <strong> New challenge </strong>
              <p>
                {activeChalenge.description}
              </p>
            </main>
            <footer>
              <button 
                type="button"
                className={styles.chalengeFailedButton}
                onClick={handleChalengeFailed}
              >
                Fail
              </button>
              <button 
                type="button"
                className={styles.chalengeSucceededButton}
                onClick={handleChalengeSucceeded}
              >
                Finish
              </button>
            </footer>
          </div>
        ) : (
          <div className={styles.chalengeNotActive}>
            <span className="bold">
              Finish a cycle to receive a challenge
            </span>
            <p>
              <img src="/icons/level-up.svg" alt="Level Up"/>
              Reach the next level finishing challenges
            </p>
          </div>
        )
      }
    </div>
  );
}
