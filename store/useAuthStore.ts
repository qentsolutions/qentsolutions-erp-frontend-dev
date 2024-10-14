// src/store/useAuthStore.ts
import { create } from "zustand";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

interface AuthState {
  token: string | null;
  user: { userId: string; username: string } | null;
  error: string | null;
  setTokenAndUser: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  error: null,

  setTokenAndUser: async () => {
    try {
      const session = await fetchAuthSession();

      // Assure-toi que la propriété `accessToken` est bien une chaîne
      const token =
        typeof session.tokens?.accessToken === "string"
          ? session.tokens.accessToken
          : null;

      if (!token) {
        set({ token: null, user: null, error: "Session not found" });
        return;
      }

      const currentUser = await getCurrentUser();

      set({
        token,
        user: {
          userId: currentUser.username,
          username: currentUser.username,
        },
        error: null,
      });
    } catch (error: any) {
      set({ token: null, user: null, error: error.message });
    }
  },

  clearSession: () => {
    set({ token: null, user: null, error: null });
  },
}));
