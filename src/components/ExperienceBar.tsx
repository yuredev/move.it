// para importar um css module é necessário nomealo
import { useContext } from "react";
import styles from "../styles/components/ExperienceBar.module.css";
import { ChalengesContext } from "../contexts/ChalengesContext";

export default function ExperienceBar() {

  const { currentXp, experienceToNextLevel } = useContext(ChalengesContext);
  const currentPercentage = (currentXp / experienceToNextLevel * 100).toFixed(2);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div className={styles.progressPane}>
        <div 
          className={styles.progressPanePercentage}
          style={{ width: `${currentPercentage}%` }}
        />
        <span 
          className={styles.currentXpValue}
          style={{ left: `${currentPercentage}%` }}  
        >
          {currentXp} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
