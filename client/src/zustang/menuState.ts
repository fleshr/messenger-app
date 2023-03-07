import { create } from 'zustand';

interface IState {
  isMenuOpened: boolean;
  toogleMenu: () => void;
  setMenu: (isOpened: boolean) => void;
}

const useMenuState = create<IState>((set) => ({
  isMenuOpened: true,
  toogleMenu: () => set((state) => ({ isMenuOpened: !state.isMenuOpened })),
  setMenu: (isOpened) => set({ isMenuOpened: isOpened }),
}));

export default useMenuState;
