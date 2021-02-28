import React from "react";
import styles from "../styles/components/ChalengeBox.module.css";

export default function ChalengeBox() {

  const hasActiveChalenge = true;

  return (
    <div className={styles.chalengeBoxContainer}>
      {
        hasActiveChalenge ? (
          <div className={styles.chalengeActive}>
            <header>Ganhe 400 xp</header>
            <main>
              <img src="icons/body.svg" alt=""/>
              <span className="bold">
                Novo desafio
              </span>
              <p>
                Levante e faça uma caminhada de 3 minutos
              </p>
            </main>
            <footer>
              <button 
                type="button"
                className={styles.chalengeFailedButton}
                onClick={() => {}}
              >
                Falhei
              </button>
              <button 
                type="button"
                className={styles.chalengeSucceededButton}
              >
                Completei
              </button>
            </footer>
          </div>
        ) : (
          <div className={styles.chalengeNotActive}>
            <span className="bold">
              Finalize um ciclo para receber um desafio
            </span>
            <p>
              <img src="/icons/level-up.svg" alt="Level Up"/>
              Avance de nível completando desafios
            </p>
          </div>
        )
      }
      
    </div>
  );
}