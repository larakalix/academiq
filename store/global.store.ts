import { create } from "zustand";
import type { School } from "@prisma/client";
import { AuthTeacher } from "@/types/service";

export type GlobalStoreState = {
    schoolId: School["id"];
    school: Pick<School, "id" | "name"> | null;
    user: AuthTeacher | null;
    theme: string;
    setTheme: (theme: string) => void;
    setSchool: (
        schoolId: School["id"],
        school: Pick<School, "id" | "name">
    ) => void;
};

export const useGlobalStore = create<GlobalStoreState>((set) => ({
    schoolId: "",
    school: null,
    theme: "light",
    user: null,
    setTheme: (theme) => set({ theme }),
    setSchool: (schoolId, school) => set({ schoolId, school }),
}));
