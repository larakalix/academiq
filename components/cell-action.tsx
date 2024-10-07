import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Copy, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { STATIC_ROUTES } from "@/lib/routeConfig";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any> & { id: string };
    customActions?: {
        label: string;
        onClick: () => void;
    }[];
    module: string;
};

export const CellAction = ({ data, module }: Props) => {
    const params = useParams();
    const schoolId = String(params?.schoolId);
    const moduleName = module.charAt(0).toUpperCase() + module.slice(1);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`${moduleName} ID copied to clipboard.`);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 ml-auto max-w-80">
            <Button className="w-full" onClick={() => onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4" /> Copy Id
            </Button>

            <Link
                href={`${STATIC_ROUTES.dashboard}/${schoolId}/${module}/${data.id}`}
                className="w-full"
            >
                <Button className="w-full">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
            </Link>
        </div>
    );
};
