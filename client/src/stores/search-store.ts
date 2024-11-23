import { ApiError } from "@/api";
import { search } from "@/api/search";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import debounce from "lodash.debounce";

interface IAuthStore {
  isLoading: boolean;
  error: string | null;
  searchResults: any[];
  search(query: string): void;
}

export const useSearchStore = create<IAuthStore>()(
  immer((set) => ({
    error: null,
    isLoading: false,
    searchResults: [],
    async search(query) {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      try {
        const searchResults = await search({
          query,
        });

        console.log(searchResults);

        set({
          searchResults: searchResults?.results || [],
          error: null,
          isLoading: false,
        });
      } catch (error) {
        set({
          error: (error as ApiError).message,
          isLoading: false,
          searchResults: [],
        });
      }
    },
  }))
);
