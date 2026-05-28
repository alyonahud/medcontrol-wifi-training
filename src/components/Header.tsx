import logo from '../../assets/Logo component.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="MedControl" />
      <p className={styles.subtitle}>Система автоматизации медицинских осмотров</p>
      <div className={styles.support}>
        <p className={styles.supportLabel}>Техническая поддержка</p>
        <p className={styles.phone}>8 (800) 555 46 03</p>
      </div>
    </header>
  );
}
