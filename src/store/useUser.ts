import { create } from "zustand";

interface UserState {
  organizationalUnit: string;
  setOrganizationalUnit: (value: string) => void;
}

export const useUser = create<UserState>((set) => ({
  organizationalUnit: "",
  setOrganizationalUnit: (value: string) =>
    set(() => ({ organizationalUnit: value })),
}));
