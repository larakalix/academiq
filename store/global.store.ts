import { create } from "zustand";
import type { School } from "@prisma/client";

export type GlobalStoreState = {
    schoolId: School["id"];
    theme: string;
    setTheme: (theme: string) => void;
};

export const useGlobalStore = create<GlobalStoreState>((set) => ({
    schoolId: "920a896a-d753-4b24-b6b1-a52dc22d2e67",
    theme: "light",
    setTheme: (theme) => set({ theme }),
}));
