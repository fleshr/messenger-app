import { IConversation } from '@/types';
import { create } from 'zustand';

interface IState {
  selectedConversation: IConversation | null;
  selectConversation: (conversation: IConversation) => void;
}

const useSelectConverstaionState = create<IState>((set) => ({
  selectedConversation: null,
  selectConversation: (conversation) =>
    set({ selectedConversation: conversation }),
}));

export default useSelectConverstaionState;
