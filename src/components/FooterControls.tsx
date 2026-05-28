import powerIcon from '../../assets/power-off.svg';
import volumeIcon from '../../assets/volume-high.svg';
import styles from './FooterControls.module.css';

type FooterControlsProps = {
  isMuted: boolean;
  onExit: () => void;
  onToggleMute: () => void;
};

export function FooterControls({ isMuted, onExit, onToggleMute }: FooterControlsProps) {
  return (
    <footer className={styles.footer}>
      <button className={styles.button} type="button" onClick={onExit}>
        <img className={styles.icon} src={powerIcon} alt="" aria-hidden="true" />
        <span className={styles.label}>Завершить</span>
      </button>
      <button
        className={`${styles.button} ${isMuted ? styles.muted : ''}`}
        type="button"
        onClick={onToggleMute}
      >
        <img className={styles.icon} src={volumeIcon} alt="" aria-hidden="true" />
        <span className={styles.label}>{isMuted ? 'Включить звук' : 'Выключить звук'}</span>
      </button>
    </footer>
  );
}
