import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "@/components/ui/custom/cell-action";
import { GENERIC_DATE_FORMAT, MODULES } from "@/lib/constants";

export type StudentColumn = {
    id: string;
    name: string;
    email: string;
    grade: string;
    parents: string;
    createdAt: Date;
};

export const columns: ColumnDef<StudentColumn>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "parents", header: "Parents" },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) =>
            format(new Date(row.original.createdAt), GENERIC_DATE_FORMAT),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <CellAction data={row.original} module={MODULES.STUDENTS} />
        ),
    },
];
