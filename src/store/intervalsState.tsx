import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { longBreakInterval, shortBreakInterval, workInterval } from "../settings";

const { persistAtom } = recoilPersist();

export interface IIntervals {
  [intervalName: string]: number;
}

export const appIntervals = atom<IIntervals>({
  key: 'appIntervals',
  default: { 'work': workInterval, 'shortBreak': shortBreakInterval, 'longBreak': longBreakInterval },
  effects_UNSTABLE: [persistAtom],
});

export const currentSeconds = atom<number>({
  key: 'currentSeconds',
  default: workInterval,
  effects_UNSTABLE: [persistAtom],
});

export const targetTimeState = atom<number>({
  key: 'targetTime',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
