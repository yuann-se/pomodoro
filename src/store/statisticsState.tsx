import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ICount {
  [period: string]: number
}

export const totalTimeState = atom<ICount>({
  key: 'totalTime',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const totalTimeRefPoint = atom<number>({
  key: 'totalTimeRefPoint',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const timeOnPauseState = atom<ICount>({
  key: 'timeOnPause',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const pauseTimeRefPoint = atom<number>({
  key: 'pauseTimeRefPoint',
  default: 0,
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
