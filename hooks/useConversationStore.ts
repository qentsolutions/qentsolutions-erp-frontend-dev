import create from "zustand";

interface LastMessage {
  content: string;
  createdAt: string;
  userId: string;
  seenBy: string[];
}

interface Conversation {
  id: string;
  participants: string[];
  orgId: string;
  lastMessage: LastMessage;
}

interface ConversationStore {
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  updateLastMessage: (conversationId: string, message: LastMessage) => void;
  setConversations: (conversations: Conversation[]) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),
  updateLastMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, lastMessage: message } : conv,
      ),
    })),
}));
