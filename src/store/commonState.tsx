import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isModalOpenState = atom<boolean>({
  key: 'isModalOpen',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isMainPageState = atom<boolean>({
  key: 'isMainPage',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
