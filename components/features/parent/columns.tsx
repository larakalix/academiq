import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/cell-action";
import { MODULES } from "@/lib/constants";

export type ParentColumn = {
    id: string;
    name: string;
    email: string;
};

export const columns: ColumnDef<ParentColumn>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} module={MODULES.PARENTS} />,
    },
];