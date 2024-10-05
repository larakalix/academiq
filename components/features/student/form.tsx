"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "./schema";
import { useModule } from "@/hooks/use-module.hook";
import { AlertModal } from "@/components/alert-modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Student } from "@prisma/client";

type Props = {
    initialData: Student | null;
};

export const StudentForm = ({ initialData }: Props) => {
    const {
        // action,
        // title,
        // description,
        loading,
        open,
        setOpen,
        onSubmit,
        onDelete,
    } = useModule({
        module: "student",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            email: "",
        },
    });

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading === "loading"}
            />

            <Card className="p-4 md:p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["name", "email"].map((key) => (
                                <FormField
                                    key={`form-field-${key}`}
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {key}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={
                                                        loading === "loading"
                                                    }
                                                    placeholder={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key.slice(1)
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        <Button>
                            {
                                {
                                    idle: "Save Changes",
                                    loading: "Saving...",
                                    error: "Oops! Something went wrong.",
                                    success: "Saved successfully!",
                                }[loading]
                            }
                        </Button>
                    </form>
                </Form>
            </Card>
        </>
    );
};
