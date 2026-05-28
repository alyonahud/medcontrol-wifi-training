import type { TutorialStep } from '../types/tutorial';
import styles from './StepHint.module.css';

type StepHintProps = {
  step: TutorialStep;
};

export function StepHint({ step }: StepHintProps) {
  return (
    <div className={styles.hint}>
      <h2 className={styles.title}>{step.title}</h2>
      <p className={styles.number}>{step.id}</p>
      <p className={styles.text}>
        {step.instruction.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
}
