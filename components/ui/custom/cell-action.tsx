import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../button";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { AlertModal } from "./alert-modal";
import { useModule } from "@/hooks/use-module.hook";
import { singular } from "pluralize";

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

    const { open, loading, setOpen, onDelete } = useModule({
        id: data.id,
        module: singular(module),
        isEdit: true,
        avoidRedirect: true,
        avoidRefresh: false,
    });

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`${moduleName} ID copied to clipboard.`);
    };

    return (
        <div className="flex gap-1 justify-end max-w-80">
            <Button onClick={() => onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4" /> Copy Id
            </Button>

            <Link
                href={`${STATIC_ROUTES.dashboard}/${schoolId}/${module}/${data.id}`}
            >
                <Button variant="default">
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>

            <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading === "loading"}
                variant="destructive"
            />
        </div>
    );
};
