import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/cell-action";
import { MODULES } from "@/lib/constants";

export type ClassColumn = {
    id: string;
    name: string;
    capacity: number;
};

export const columns: ColumnDef<ClassColumn>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "capacity", header: "Capacity" },
    {
        id: "actions",
        cell: ({ row }) => (
            <CellAction data={row.original} module={MODULES.CLASSES} />
        ),
    },
];
