import { create } from 'zustand';

interface IState {
  converstaionFilter: string | null;
  setConversationFilter: (converstaionFilter: string) => void;
}

const useConversationFilter = create<IState>((set) => ({
  converstaionFilter: null,
  setConversationFilter: (converstaionFilter) => set({ converstaionFilter }),
}));

export default useConversationFilter;
