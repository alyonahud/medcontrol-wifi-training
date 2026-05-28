import hand from '../../assets/hand.svg';
import type { TutorialStep } from '../types/tutorial';
import styles from './AnimatedHand.module.css';

type AnimatedHandProps = {
  step: TutorialStep;
};

export function AnimatedHand({ step }: AnimatedHandProps) {
  const className = [
    styles.hand,
    styles[step.hand.mode],
    step.hand.mirrored ? styles.mirrored : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={{
        left: step.hand.x,
        top: step.hand.y,
        width: step.hand.width,
        height: step.hand.height,
      }}
    >
      <img className={styles.handImage} src={hand} alt="" aria-hidden="true" />
    </div>
  );
}
