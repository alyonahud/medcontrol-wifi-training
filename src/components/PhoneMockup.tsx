import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import type { TutorialStep } from '../types/tutorial';
import styles from './PhoneMockup.module.css';

type PhoneMockupProps = {
  debugMode: boolean;
  holdHandlers?: ButtonHTMLAttributes<HTMLButtonElement>;
  holdProgress: number;
  isHolding: boolean;
  onTap?: () => void;
  step: TutorialStep;
};

export function PhoneMockup({
  debugMode,
  holdHandlers,
  holdProgress,
  isHolding,
  onTap,
  step,
}: PhoneMockupProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - circumference * holdProgress;
  const isLongPress = step.action === 'longPress';

  const targetStyle: CSSProperties = {
    left: step.target.x,
    top: step.target.y,
    width: step.target.width,
    height: step.target.height,
  };

  return (
    <div
      className={styles.phone}
      style={{
        width: step.phone.width,
        height: step.phone.height,
      }}
    >
      <img
        className={styles.image}
        src={step.phone.src}
        alt={`Экран телефона, шаг ${step.id}`}
        draggable={false}
      />
      <button
        {...holdHandlers}
        className={`${styles.target} ${debugMode ? styles.debug : ''}`}
        type="button"
        style={targetStyle}
        onClick={step.action === 'tap' ? onTap : undefined}
        aria-label={isLongPress ? 'Удерживать целевую область' : 'Нажать целевую область'}
      >
        {isLongPress ? (
          <>
            <span className={`${styles.holdFeedback} ${isHolding ? styles.holding : ''}`} />
            <span
              className={`${styles.progress} ${
                isHolding || holdProgress > 0 ? styles.progressVisible : ''
              }`}
              aria-hidden="true"
            >
              <svg className={styles.progressSvg} viewBox="0 0 102 102">
                <circle className={styles.progressTrack} cx="51" cy="51" r={radius} />
                <circle
                  className={styles.progressValue}
                  cx="51"
                  cy="51"
                  r={radius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: dashOffset,
                  }}
                />
              </svg>
            </span>
          </>
        ) : null}
      </button>
    </div>
  );
}
