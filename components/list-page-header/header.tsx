"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { singular } from "pluralize";
import { Plus } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = { module: string; lastAction?: string };

export const ListHeader = ({ module, lastAction }: Props) => {
    const params = useParams();
    const schoolId = String(params?.schoolId);

    return (
        <nav className="flex items-center justify-between">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                href={`${STATIC_ROUTES.dashboard}/${schoolId}`}
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
                                href={
                                    lastAction
                                        ? `${STATIC_ROUTES.dashboard}/${schoolId}/${module}`
                                        : "#"
                                }
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

            <ul>
                <li>
                    <Link
                        href={`${STATIC_ROUTES.dashboard}/${schoolId}/${module}/new`}
                    >
                        <Button>
                            <Plus size={16} className="mr-2" />
                            Add {singular(module)}
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
