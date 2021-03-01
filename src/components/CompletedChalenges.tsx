import { useContext } from "react";
import { ChalengesContext } from "../contexts/ChalengesContext";
import styles from "../styles/components/CompletedChalenges.module.css";

export default function CompletedChalenges() {

  const { chalengesCompleted } = useContext(ChalengesContext);

  return (
    <div className={styles.completedChalengesContainer}>
      <span>Completed challenges</span>
      <span>{chalengesCompleted}</span>
    </div>
  );
}
