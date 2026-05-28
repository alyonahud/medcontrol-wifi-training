export type AppScreen = 'start' | 'training' | 'complete';

export type TrainingAction = 'longPress' | 'tap';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HandConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  mirrored?: boolean;
  mode: 'hold' | 'tap';
};

export type TutorialStep = {
  id: number;
  title: string;
  instruction: string[];
  action: TrainingAction;
  phone: {
    src: string;
    width: number;
    height: number;
  };
  target: Rect;
  hand: HandConfig;
  audioSrc?: string;
};
