import { useContext } from "react";
import { ChalengesContext } from "../contexts/ChalengesContext";
import styles from "../styles/components/Profile.module.css";

export default function Profile() {
  const { level } = useContext(ChalengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/yuredev.png" alt="Yure Matias"/>
      <div>
        <span className="bold">
          Yure Matias
        </span>
        <p>
          <img src="/icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
