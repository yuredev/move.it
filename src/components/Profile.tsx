import styles from "../styles/components/Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/yuredev.png" alt="Yure Matias"/>
      <div>
        <span className="bold">
          Yure Matias
        </span>
        <p>
          <img src="/icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}
