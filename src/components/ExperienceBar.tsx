// para importar um css module é necessário nomealo
import styles from "../styles/components/ExperienceBar.module.css";

export default function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div className={styles.progressPane}>
        <div 
          className={styles.progressPanePercentage}
          style={{ width: '50%' }}
        />
        <span 
          className={styles.currentXpValue}
          style={{left: '50%'}}  
        >
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
}
