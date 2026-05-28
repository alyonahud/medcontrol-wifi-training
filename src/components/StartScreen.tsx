import character from '../../assets/character image.png';
import styles from './StartScreen.module.css';

type StartScreenProps = {
  onInstructionClick: () => void;
  onTrainingClick: () => void;
};

export function StartScreen({ onInstructionClick, onTrainingClick }: StartScreenProps) {
  return (
    <section className={styles.screen} aria-label="Подключение к Wi-Fi">
      <h1 className={styles.title}>
        Подключение
        <br />
        к Wi-Fi
      </h1>
      <div className={styles.actions}>
        <button className={`${styles.button} ${styles.primary}`} type="button" onClick={onTrainingClick}>
          Пойти обучение
        </button>
        <button className={`${styles.button} ${styles.secondary}`} type="button" onClick={onInstructionClick}>
          Читать инструкцию
        </button>
      </div>
      <div className={styles.characterMask}>
        <img className={styles.character} src={character} alt="" aria-hidden="true" />
      </div>
    </section>
  );
}
