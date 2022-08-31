import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { longBreakInterval, shortBreakInterval, workInterval } from "./settings";

const { persistAtom } = recoilPersist();

export interface IIntervals {
  [intervalName: string]: number;
}

export const appIntervals = atom<IIntervals>({
  key: 'appIntervals',
  default: { 'work': workInterval, 'shortBreak': shortBreakInterval, 'longBreak': longBreakInterval },
  effects_UNSTABLE: [persistAtom],
});
// При изменении интервалов необходимо поменять дефолтное значение в currentSeconds
export const currentSeconds = atom<number>({
  key: 'currentSeconds',
  default: workInterval,
  effects_UNSTABLE: [persistAtom],
});

export interface ITask {
  poms: number;
  text: string;
  id: string;
}

export const tasksState = atom<ITask[]>({
  key: 'tasksList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const completedTasksState = atom<ITask[]>({
  key: 'completedTasksList',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const currentTaskState = atom<ITask>({
  key: 'currentTask',
  default: { text: '', id: '', poms: 0 },
  effects_UNSTABLE: [persistAtom],
});

export interface ICount {
  [period: string]: number
}

export const totalTimeState = atom<ICount>({
  key: 'totalTime',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const timeOnPauseState = atom<ICount>({
  key: 'timeOnPause',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const stopsCountState = atom<ICount>({
  key: 'stopsCount',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const totalPomodorosState = atom<ICount>({
  key: 'totalPomodoros',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

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

export const isModalOpenState = atom<boolean>({
  key: 'isModalOpen',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const selectedPeriod = atom<string>({
  key: 'selectedPeriod',
  default: 'Эта неделя',
  effects_UNSTABLE: [persistAtom],
});

const getToday = () => {
  let today = new Date().getDay();
  if (today === 0) today = 7;
  return today;
}

export const selectedDayState = atom<number>({
  key: 'selectedDay',
  default: getToday(),
  effects_UNSTABLE: [persistAtom],
});

export const isMainPageState = atom<boolean>({
  key: 'isMainPage',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
