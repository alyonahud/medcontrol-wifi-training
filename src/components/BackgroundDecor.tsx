import logo from '../../assets/Logo component.svg';
import styles from './BackgroundDecor.module.css';

type BackgroundDecorProps = {
  mode: 'start' | 'training';
};

export function BackgroundDecor({ mode }: BackgroundDecorProps) {
  return (
    <div className={`${styles.decor} ${mode === 'training' ? styles.training : ''}`}>
      <span className={styles.ellipseOne} />
      <span className={styles.ellipseTwo} />
      <img
        className={`${styles.watermark} ${styles.watermarkPrimary}`}
        src={logo}
        alt=""
        aria-hidden="true"
      />
      <img
        className={`${styles.watermark} ${styles.watermarkSecondary}`}
        src={logo}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
