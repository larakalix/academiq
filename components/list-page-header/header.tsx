import React from "react";
import Link from "next/link";
import { singular } from "pluralize";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ROUTES } from "@/lib/routeConfig";
import { cn } from "@/lib/utils";

type Props = { module: string; lastAction?: string };

export const ListHeader = ({ module, lastAction }: Props) => {
    const moduleRoute = ROUTES.get(module) ?? `/${module}`;

    return (
        <nav>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href={ROUTES.get("dashboard") ?? "/dashboard"}
                                className="text-zinc-500"
                            >
                                Dashboard
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href={lastAction ? moduleRoute : "#"}
                                className={cn("capitalize", {
                                    "text-zinc-900": !lastAction,
                                    "text-zinc-500": lastAction,
                                })}
                            >
                                {module}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {lastAction && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    className={cn("capitalize", {
                                        "text-zinc-500": !lastAction,
                                        "text-zinc-900": lastAction,
                                    })}
                                >
                                    <span className="capitalize">
                                        {lastAction}
                                    </span>{" "}
                                    {singular(module)}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    );
};
