import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (update) => {
    // if a function is passed, call it with previous state
    if (typeof update === "function") {
      set((state) => ({ messages: update(state.messages) }));
    } else {
      set({ messages: update });
    }
  },
}));

export default useConversation;
