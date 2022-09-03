import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
