import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const currentPomodorosState = atom<number>({
  key: 'currentPomodoros',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const isTimerStartedState = atom<boolean>({
  key: 'isTimerStarted',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isTimerRunningState = atom<boolean>({
  key: 'isTimerRunning',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isTaskStartedState = atom<boolean>({
  key: 'isTaskStarted',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isTaskDoneState = atom<boolean>({
  key: 'isTaskDone',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isTimerStoppedState = atom<boolean>({
  key: 'isTimerStopped',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isWorkState = atom<boolean>({
  key: 'isWork',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const workSessionsCountState = atom<number>({
  key: 'workSessionsCount',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

