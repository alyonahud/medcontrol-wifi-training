import { LONG_PRESS_MS } from '../config/tutorialSteps';
import { useLongPress } from '../hooks/useLongPress';
import type { TutorialStep } from '../types/tutorial';
import { AnimatedHand } from './AnimatedHand';
import { PhoneMockup } from './PhoneMockup';
import { StepHint } from './StepHint';
import styles from './TrainingScreen.module.css';

type TrainingScreenProps = {
  debugMode: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onStepComplete: () => void;
  step: TutorialStep;
};

export function TrainingScreen({
  debugMode,
  onNextStep,
  onPreviousStep,
  onStepComplete,
  step,
}: TrainingScreenProps) {
  const longPress = useLongPress({
    duration: LONG_PRESS_MS,
    enabled: step.action === 'longPress',
    onComplete: onStepComplete,
  });

  return (
    <section className={styles.screen} aria-label={`Шаг ${step.id}`}>
      <StepHint step={step} />
      <PhoneMockup
        debugMode={debugMode}
        holdHandlers={step.action === 'longPress' ? longPress.handlers : undefined}
        holdProgress={step.action === 'longPress' ? longPress.progress : 0}
        isHolding={step.action === 'longPress' ? longPress.isHolding : false}
        onTap={step.action === 'tap' ? onStepComplete : undefined}
        step={step}
      />
      <AnimatedHand step={step} />
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
    </section>
  );
}
