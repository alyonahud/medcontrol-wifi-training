import { useMemo, useState, type CSSProperties } from 'react';
import styles from './App.module.css';
import { DESIGN_HEIGHT, DESIGN_WIDTH, useFitScale } from './hooks/useFitScale';
import { tutorialSteps } from './config/tutorialSteps';
import type { AppScreen } from './types/tutorial';
import { AudioController } from './components/AudioController';
import { BackgroundDecor } from './components/BackgroundDecor';
import { CompleteScreen } from './components/CompleteScreen';
import { FooterControls } from './components/FooterControls';
import { Header } from './components/Header';
import { MobileExperience } from './components/MobileExperience';
import { StartScreen } from './components/StartScreen';
import { TrainingScreen } from './components/TrainingScreen';
import { useIsMobile } from './hooks/useIsMobile';
import instructionPdf from '../assets/instruction-placeholder.pdf';

function App() {
  const scale = useFitScale();
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState<AppScreen>('start');
  const [stepIndex, setStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const activeStep = tutorialSteps[stepIndex];
  const debugMode = useMemo(() => {
    return new URLSearchParams(window.location.search).has('debug');
  }, []);

  const openInstruction = () => {
    window.open(instructionPdf, '_blank', 'noopener,noreferrer');
  };

  const startTraining = () => {
    setStepIndex(0);
    setScreen('training');
  };

  const exitTraining = () => {
    setStepIndex(0);
    setScreen('start');
  };

  const completeStep = () => {
    setStepIndex((currentStep) => {
      if (currentStep === tutorialSteps.length - 1) {
        setScreen('complete');
        return currentStep;
      }

      return currentStep + 1;
    });
  };

  const previousStep = () => {
    setStepIndex((currentStep) => {
      if (currentStep === 0) {
        setScreen('start');
        return 0;
      }

      return currentStep - 1;
    });
  };

  const stageStyle = {
    '--scale': scale,
  } as CSSProperties;

  if (isMobile) {
    return (
      <>
        <MobileExperience
          debugMode={debugMode}
          isMuted={isMuted}
          onExit={exitTraining}
          onInstructionClick={openInstruction}
          onNextStep={completeStep}
          onPreviousStep={previousStep}
          onRestart={startTraining}
          onStart={startTraining}
          onStepComplete={completeStep}
          onToggleMute={() => setIsMuted((current) => !current)}
          screen={screen}
          step={activeStep}
        />
        <AudioController
          isMuted={isMuted}
          source={screen === 'training' ? activeStep.audioSrc : undefined}
        />
      </>
    );
  }

  return (
    <div className={styles.shell}>
      <div
        className={styles.frame}
        style={stageStyle}
        aria-label={`${DESIGN_WIDTH} by ${DESIGN_HEIGHT} MedControl instruction scene`}
      >
        <main className={styles.stage}>
          <BackgroundDecor mode={screen === 'start' ? 'start' : 'training'} />
          <Header />
          <div className={styles.content}>
            {screen === 'start' ? (
              <StartScreen
                onInstructionClick={openInstruction}
                onTrainingClick={startTraining}
              />
            ) : null}

            {screen === 'training' ? (
              <TrainingScreen
                debugMode={debugMode}
                onNextStep={completeStep}
                onPreviousStep={previousStep}
                onStepComplete={completeStep}
                step={activeStep}
              />
            ) : null}

            {screen === 'complete' ? (
              <CompleteScreen onFinish={exitTraining} onRestart={startTraining} />
            ) : null}
          </div>

          {screen !== 'start' ? (
            <FooterControls
              isMuted={isMuted}
              onExit={exitTraining}
              onToggleMute={() => setIsMuted((current) => !current)}
            />
          ) : null}

          <AudioController
            isMuted={isMuted}
            source={screen === 'training' ? activeStep.audioSrc : undefined}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
