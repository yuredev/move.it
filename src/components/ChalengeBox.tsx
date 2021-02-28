import React from "react";
import styles from "../styles/components/ChalengeBox.module.css";

export default function ChalengeBox() {

  const hasActiveChalenge = true;

  return (
    <div className={styles.chalengeBoxContainer}>
      {
        hasActiveChalenge ? (
          <div className={styles.chalengeActive}>
            <header>Gain 400 xp</header>
            <main>
              <img src="icons/body.svg" alt=""/>
              <span className="bold">
                New challenge
              </span>
              <p>
                Get up and take a 10 minute walk
              </p>
            </main>
            <footer>
              <button 
                type="button"
                className={styles.chalengeFailedButton}
                onClick={() => {}}
              >
                Failed
              </button>
              <button 
                type="button"
                className={styles.chalengeSucceededButton}
              >
                Finished
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