import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const tasksState = atom<string[]>({
  key: 'tasksList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const totalTimeState = atom<number>({
  key: 'totalTime',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const timeOnPauseState = atom<number>({
  key: 'timeOnPause',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const stopsCountState = atom<number>({
  key: 'stopsCount',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const currentTimerState = atom<number>({
  key: 'currentTimerState',
  default: 10,
  effects_UNSTABLE: [persistAtom],
});

export const currentPomodorosState = atom<number>({
  key: 'currentPomodoros',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const totalPomodorosState = atom<number>({
  key: 'totalPomodoros',
  default: 0,
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
  key: 'isTimerStoppedState',
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

export const isModalOpenState = atom<boolean>({
  key: 'isModalOpen',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
