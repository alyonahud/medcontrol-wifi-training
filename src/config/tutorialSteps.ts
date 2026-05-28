import type { TutorialStep } from '../types/tutorial';
import stepOnePhone from '../../assets/demo phone- step 1.png';
import stepTwoPhone from '../../assets/demo phone- step 2.png';
import stepThreePhone from '../../assets/demo phone- step 3.png';

export const LONG_PRESS_MS = 3000;

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Закройте приложение',
    instruction: ['Зажмите фразу', '«Добро пожаловать!»', 'на 5 секунд'],
    action: 'longPress',
    phone: {
      src: stepOnePhone,
      width: 336,
      height: 665,
    },
    target: {
      x: 23,
      y: 252,
      width: 290,
      height: 94,
    },
    hand: {
      x: 677,
      y: 526,
      width: 353,
      height: 217,
      mode: 'hold',
    },
  },
  {
    id: 2,
    title: 'Закройте приложение',
    instruction: ['В левом верхнем углу', 'нажмите на иконку', '«Выйти»'],
    action: 'tap',
    phone: {
      src: stepTwoPhone,
      width: 336,
      height: 666,
    },
    target: {
      x: 281,
      y: 13,
      width: 45,
      height: 47,
    },
    hand: {
      x: 562,
      y: 286,
      width: 353,
      height: 217,
      mirrored: true,
      mode: 'tap',
    },
  },
  {
    id: 3,
    title: 'Закройте приложение',
    instruction: ['Подтвердите выход', 'из приложения'],
    action: 'tap',
    phone: {
      src: stepThreePhone,
      width: 336,
      height: 666,
    },
    target: {
      x: 25,
      y: 443,
      width: 286,
      height: 63,
    },
    hand: {
      x: 416,
      y: 712,
      width: 353,
      height: 217,
      mirrored: true,
      mode: 'tap',
    },
  },
];
