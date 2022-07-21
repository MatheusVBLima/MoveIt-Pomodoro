import React, { useContext } from "react";
import { CountdownContext } from "../context/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isRunning,
    handleResetCountdown,
    handleStartCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

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

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo Encerrado
        </button>
      ) : (
        <>
          {isRunning ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonStop}`}
              onClick={handleResetCountdown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={handleStartCountdown}
            >
              Iniciar Um Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
