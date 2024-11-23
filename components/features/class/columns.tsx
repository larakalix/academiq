import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export type ClassColumn = {
    id: string;
    name: string;
    capacity: number;
    createdAt: Date;
};

export const columns: ColumnDef<ClassColumn>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "capacity", header: "Capacity" },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) =>
            format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <CellAction data={row.original} module={MODULES.CLASSES} />
        ),
    },
];
