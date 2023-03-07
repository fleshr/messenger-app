import { create } from 'zustand';

interface IState {
  isUserSearchOpened: boolean;
  openUserSearch: () => void;
  closeUserSearch: () => void;
  searchQuery: string | null;
  setSearchQuery: (q: string | null) => void;
}

const useUserSearchState = create<IState>((set) => ({
  isUserSearchOpened: false,
  openUserSearch: () => set({ isUserSearchOpened: true }),
  closeUserSearch: () => set({ isUserSearchOpened: false }),
  searchQuery: null,
  setSearchQuery: (q) => set({ searchQuery: q }),
}));

export default useUserSearchState;
