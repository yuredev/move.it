import { useContext } from "react";
import { ChalengesContext } from "../contexts/ChalengesContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChalengesContext);
  return (
    <div className={styles.overlay} style={{  }}>
      <div className={styles.container}>
        <header>{ level }</header>
        <span className="bold">Congratulations</span>
        <p>You reached a new level.</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Close modal"/>
        </button>
      </div>
    </div>
  );
}
