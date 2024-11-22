import { ApiError } from "@/api";
import { IRegisterParams, register as registerApi } from "@/api/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IAuthStore {
  isLoading: boolean;
  registered: boolean;
  fieldErrors: Record<string, string>;
  formValues: IRegisterParams | null;
  error: string | null;
  register(params: IRegisterParams): void;
  setFormFieldErrors(fieldErrors: Record<string, string>): void;
}

export const useUserRegistrationStore = create<IAuthStore>()(
  immer((set) => ({
    error: null,
    registered: false,
    fieldErrors: {},
    isLoading: false,
    formValues: null,
    register(params) {
      set((s) => {
        s.isLoading = true;
        s.formValues = params;
      });
      registerApi(params)
        .then(() => {
          set((state) => {
            state.registered = true;
            state.error = null;
            state.fieldErrors = {};
            state.isLoading = false;
          });
        })
        .catch((error: ApiError) => {
          set((state) => {
            state.error = error.message;
            state.isLoading = false;
            state.registered = false;
          });
        });
    },
    setFormFieldErrors(fieldErrors) {
      set({
        fieldErrors,
      });
    },
  }))
);
