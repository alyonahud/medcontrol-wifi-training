import styles from './CompleteScreen.module.css';

type CompleteScreenProps = {
  onFinish: () => void;
  onRestart: () => void;
};

export function CompleteScreen({ onFinish, onRestart }: CompleteScreenProps) {
  return (
    <section className={styles.screen} aria-label="Обучение завершено">
      <div className={styles.panel}>
        <h2 className={styles.title}>Готово</h2>
        <p className={styles.text}>Обучение завершено</p>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.secondary}`} type="button" onClick={onRestart}>
            Повторить
          </button>
          <button className={`${styles.button} ${styles.primary}`} type="button" onClick={onFinish}>
            Завершить
          </button>
        </div>
      </div>
    </section>
  );
}
