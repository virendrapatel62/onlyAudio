import { ApiError } from "@/api";
import { login } from "@/api/auth";
import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IUser {
  firstName: string;
  id: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface IAuthStore {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login(email: string, password: string): void;
  logout(): void;
}

const toBePersistedKeys: (keyof IAuthStore)[] = ["user", "token"];

const persistOptions: PersistOptions<IAuthStore> = {
  name: "auth",
  storage: createJSONStorage(() => localStorage),
  partialize(state) {
    return Object.fromEntries(
      Object.entries(state).filter(([key]) =>
        (toBePersistedKeys as string[]).includes(key)
      )
    ) as IAuthStore;
  },
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        login({
          email,
          password,
        })
          .then((response) => {
            set((state) => {
              state.token = response.token;
              state.user = response.user;
              state.error = null;
            });
            console.log(response);
          })
          .catch((error: ApiError) => {
            set((state) => {
              state.error = error.message;
              state.token = null;
              state.user = null;
            });
          })
          .finally(() => {
            set((state) => {
              state.isLoading = false;
            });
          });
      },

      logout: () => set({ user: null, token: null }),
    })),
    persistOptions
  )
);

export const useIsAuthenticated = () => !!useAuthStore().token;
export const useUser = () => useAuthStore().user;
