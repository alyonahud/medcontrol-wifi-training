import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import character from '../../assets/character image.png';
import hand from '../../assets/hand.svg';
import logo from '../../assets/Logo component.svg';
import powerIcon from '../../assets/power-off.svg';
import volumeIcon from '../../assets/volume-high.svg';
import { LONG_PRESS_MS } from '../config/tutorialSteps';
import { useLongPress } from '../hooks/useLongPress';
import type { AppScreen, TutorialStep } from '../types/tutorial';
import styles from './MobileExperience.module.css';

type MobileExperienceProps = {
  debugMode: boolean;
  isMuted: boolean;
  onExit: () => void;
  onInstructionClick: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onRestart: () => void;
  onStart: () => void;
  onStepComplete: () => void;
  onToggleMute: () => void;
  screen: AppScreen;
  step: TutorialStep;
};

function MobileHeader() {
  return (
    <header className={styles.header}>
      <div>
        <img className={styles.logo} src={logo} alt="MedControl" />
        <p className={styles.subtitle}>Система автоматизации медицинских осмотров</p>
      </div>
      <div className={styles.support}>
        <p className={styles.supportLabel}>Техническая поддержка</p>
        <p className={styles.supportPhone}>8 (800) 555 46 03</p>
      </div>
    </header>
  );
}

function MobileFooter({
  isMuted,
  onExit,
  onToggleMute,
}: Pick<MobileExperienceProps, 'isMuted' | 'onExit' | 'onToggleMute'>) {
  return (
    <footer className={styles.footer}>
      <button className={styles.footerButton} type="button" onClick={onExit}>
        <img className={styles.footerIcon} src={powerIcon} alt="" aria-hidden="true" />
        <span>Завершить</span>
      </button>
      <button className={styles.footerButton} type="button" onClick={onToggleMute}>
        <img className={styles.footerIcon} src={volumeIcon} alt="" aria-hidden="true" />
        <span>{isMuted ? 'Включить звук' : 'Выключить звук'}</span>
      </button>
    </footer>
  );
}

function MobileStart({
  onInstructionClick,
  onStart,
}: Pick<MobileExperienceProps, 'onInstructionClick' | 'onStart'>) {
  return (
    <section className={styles.start} aria-label="Подключение к Wi-Fi">
      <div className={styles.startContent}>
        <h1 className={styles.startTitle}>
          Подключение
          <br />
          к Wi-Fi
        </h1>
        <div className={styles.startActions}>
          <button className={`${styles.startButton} ${styles.primaryButton}`} type="button" onClick={onStart}>
            Пойти обучение
          </button>
          <button
            className={`${styles.startButton} ${styles.secondaryButton}`}
            type="button"
            onClick={onInstructionClick}
          >
            Читать инструкцию
          </button>
        </div>
      </div>
      <img className={styles.character} src={character} alt="" aria-hidden="true" />
    </section>
  );
}

function MobilePhone({
  debugMode,
  holdHandlers,
  holdProgress,
  isHolding,
  onTap,
  step,
}: {
  debugMode: boolean;
  holdHandlers?: ButtonHTMLAttributes<HTMLButtonElement>;
  holdProgress: number;
  isHolding: boolean;
  onTap?: () => void;
  step: TutorialStep;
}) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - circumference * holdProgress;
  const isLongPress = step.action === 'longPress';
  const targetStyle = {
    left: `${(step.target.x / step.phone.width) * 100}%`,
    top: `${(step.target.y / step.phone.height) * 100}%`,
    width: `${(step.target.width / step.phone.width) * 100}%`,
    height: `${(step.target.height / step.phone.height) * 100}%`,
  };
  const phoneStyle = {
    '--phone-ratio': `${step.phone.width} / ${step.phone.height}`,
  } as CSSProperties;
  const handClassName = [
    styles.mobileHand,
    step.id === 1 ? styles.mobileHandHold : '',
    step.id === 2 ? `${styles.mobileHandTap} ${styles.mobileHandExit}` : '',
    step.id === 3 ? `${styles.mobileHandTap} ${styles.mobileHandConfirm}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.phoneFrame} style={phoneStyle}>
      <img
        className={styles.phoneImage}
        src={step.phone.src}
        alt={`Экран телефона, шаг ${step.id}`}
        draggable={false}
      />
      <button
        {...holdHandlers}
        className={`${styles.target} ${debugMode ? styles.targetDebug : ''}`}
        type="button"
        style={targetStyle}
        onClick={step.action === 'tap' ? onTap : undefined}
        aria-label={isLongPress ? 'Удерживать целевую область' : 'Нажать целевую область'}
      >
        {isLongPress ? (
          <span
            className={`${styles.holdProgress} ${
              isHolding || holdProgress > 0 ? styles.holdProgressVisible : ''
            }`}
            aria-hidden="true"
          >
            <svg className={styles.holdProgressSvg} viewBox="0 0 76 76">
              <circle className={styles.holdProgressTrack} cx="38" cy="38" r={radius} />
              <circle
                className={styles.holdProgressValue}
                cx="38"
                cy="38"
                r={radius}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: dashOffset,
                }}
              />
            </svg>
          </span>
        ) : null}
      </button>
      <div className={handClassName}>
        <img src={hand} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}

function MobileTraining({
  debugMode,
  onNextStep,
  onPreviousStep,
  onStepComplete,
  step,
}: Pick<
  MobileExperienceProps,
  'debugMode' | 'onNextStep' | 'onPreviousStep' | 'onStepComplete' | 'step'
>) {
  const longPress = useLongPress({
    duration: LONG_PRESS_MS,
    enabled: step.action === 'longPress',
    onComplete: onStepComplete,
  });

  return (
    <section className={styles.training} aria-label={`Шаг ${step.id}`}>
      <div className={styles.trainingTop}>
        <h2 className={styles.instructionTitle}>{step.title}</h2>
        <div className={styles.instructionRow}>
          <span className={styles.stepNumber}>{step.id}</span>
          <p className={styles.instructionText}>
            {step.instruction.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.phoneArea}>
        <MobilePhone
          debugMode={debugMode}
          holdHandlers={step.action === 'longPress' ? longPress.handlers : undefined}
          holdProgress={step.action === 'longPress' ? longPress.progress : 0}
          isHolding={step.action === 'longPress' ? longPress.isHolding : false}
          onTap={step.action === 'tap' ? onStepComplete : undefined}
          step={step}
        />
        <nav className={styles.navigation} aria-label="Навигация по экранам инструкции">
          <button
            className={`${styles.navButton} ${styles.navPrevious}`}
            type="button"
            onClick={onPreviousStep}
            aria-label="Предыдущий экран инструкции"
          />
          <button
            className={`${styles.navButton} ${styles.navNext}`}
            type="button"
            onClick={onNextStep}
            aria-label="Следующий экран инструкции"
          />
        </nav>
      </div>
    </section>
  );
}

function MobileComplete({
  onExit,
  onRestart,
}: Pick<MobileExperienceProps, 'onExit' | 'onRestart'>) {
  return (
    <section className={styles.complete} aria-label="Обучение завершено">
      <div className={styles.completePanel}>
        <h2 className={styles.completeTitle}>Готово</h2>
        <p className={styles.completeText}>Обучение завершено</p>
        <div className={styles.completeActions}>
          <button
            className={`${styles.completeButton} ${styles.secondaryButton}`}
            type="button"
            onClick={onRestart}
          >
            Повторить
          </button>
          <button
            className={`${styles.completeButton} ${styles.primaryButton}`}
            type="button"
            onClick={onExit}
          >
            Завершить
          </button>
        </div>
      </div>
    </section>
  );
}

export function MobileExperience({
  debugMode,
  isMuted,
  onExit,
  onInstructionClick,
  onNextStep,
  onPreviousStep,
  onRestart,
  onStart,
  onStepComplete,
  onToggleMute,
  screen,
  step,
}: MobileExperienceProps) {
  return (
    <main className={styles.shell}>
      <MobileHeader />
      <div className={styles.main}>
        {screen === 'start' ? (
          <MobileStart onInstructionClick={onInstructionClick} onStart={onStart} />
        ) : null}
        {screen === 'training' ? (
          <MobileTraining
            debugMode={debugMode}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
            onStepComplete={onStepComplete}
            step={step}
          />
        ) : null}
        {screen === 'complete' ? <MobileComplete onExit={onExit} onRestart={onRestart} /> : null}
      </div>
      {screen !== 'start' ? (
        <MobileFooter isMuted={isMuted} onExit={onExit} onToggleMute={onToggleMute} />
      ) : null}
    </main>
  );
}
