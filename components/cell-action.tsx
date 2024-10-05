import React from "react";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    customActions?: {
        label: string;
        onClick: () => void;
    }[];
    module: string;
};

export const CellAction = ({ data, module }: Props) => {
    const moduleName = module.charAt(0).toUpperCase() + module.slice(1);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`${moduleName} ID copied to clipboard.`);
    };

    return (
        <div>
            <Button onClick={() => onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4" /> Copy Id
            </Button>
        </div>
    );
};
