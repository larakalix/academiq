"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { singular } from "pluralize";
import { Button } from "./ui/button";

export const EmptyState = ({ module }: { module: string }) => {
    const moduleName = singular(module);

    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm lg:gap-6 px-4 lg:px-6 py-4 lg:py-8">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no <span className="lowercase">{module}</span>
                </h3>

                <p className="text-sm text-muted-foreground">
                    You haven&apos;t added any {moduleName} yet.
                </p>

                <Link href={`/${module}/new`}>
                    <Button className="mt-4">
                        <Plus size={16} className="mr-1" />
                        Add {moduleName}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
