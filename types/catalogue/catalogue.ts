import type { Grade } from "@prisma/client";

export type GradeCatalogue = Pick<Grade, "id" | "level">;
