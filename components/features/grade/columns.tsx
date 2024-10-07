import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export type GradeColumn = {
    id: string;
    level: string;
    createdAt: Date;
};

export const columns: ColumnDef<GradeColumn>[] = [
    { accessorKey: "level", header: "Level" },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) =>
            format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <CellAction data={row.original} module={MODULES.ANNOUNCEMENTS} />
        ),
    },
];
