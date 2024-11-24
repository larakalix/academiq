"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "./schema";
import { useModule } from "@/hooks/use-module.hook";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { Card } from "@/components/ui/card";
import type { School } from "@prisma/client";
import { useParams } from "next/navigation";

type Props = {
    initialData: School | null;
    schoolId: string;
}

export const SchoolForm = ({ initialData, schoolId }: Props) => {
    const params = useParams();
    params.id = schoolId;

    const { loading, onSubmit, } = useModule({
        module: "school",
        isEdit: !!initialData,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            address: "",
            email: "",
            phone: "",
        },
    });


    const fields = [
        { name: "name", label: "School Name", placeholder: "Springfield High School" },
        { name: "email", label: "Contact Email", placeholder: "info@springfieldhigh.edu" },
        { name: "phone", label: "Phone Number", placeholder: "(555) 123-4567" },
        { name: "address", label: "Address", placeholder: "123 Elm St, Springfield, IL" },
    ];


    return (
        <>

            <Card className="p-4 md:p-6">
                <Form {...form}>
                    <form className="space-y-8 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {fields.map(({ name, label, placeholder }) => (
                                <FormField
                                    key={`form-field-${name}`}
                                    control={form.control}
                                    name={name as keyof FormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={
                                                        loading === "loading"
                                                    }
                                                    placeholder={placeholder}
                                                />
                                            </FormControl>

                                            <FormMessage className="font-medium mt-2 text-sm text-red-600 dark:text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        <SubmitButton
                            state={loading}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {
                                {
                                    idle: "Save Changes",
                                    loading: "Saving...",
                                    error: "Oops! Something went wrong.",
                                    success: "Saved successfully!",
                                }[loading]
                            }
                        </SubmitButton>
                    </form>
                </Form>
            </Card>
        </>
    );
}
