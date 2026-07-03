"use client";

import { create } from "zustand";
import { User } from "@/types/auth";
import { storage } from "@/utils/storage";

interface AuthState {
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;

  setUser: (user: User) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getToken(),

  user: null,

  setToken: (token) => {
    storage.setToken(token);

    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    storage.removeToken();

    set({
      token: null,
      user: null,
    });
  },
}));