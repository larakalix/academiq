"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { StudentSummary } from "./student-summary";
import type { Student } from "@/types/schemas/students";
import { getInitials } from "@/lib/utils";

type Props = {
    student: Student;
};

export const StudentCard = ({ student }: Props) => {
    return (
        <Card key={student.id}>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <figure className="flex justify-center items-center">
                    <Avatar className="size-20">
                        <AvatarImage
                            src={student.photo ?? ""}
                            className="size-20"
                        />
                        <AvatarFallback>
                            {getInitials(student?.name)}
                        </AvatarFallback>
                    </Avatar>
                </figure>

                <div className="md:col-span-2 flex flex-col justify-center items-center md:items-start pl-0 gap-y-1 md:pl-2">
                    <h4 className="font-semibold">{student.name}</h4>

                    <ul className="flex flex-col w-full">
                        <li className="flex items-center justify-center md:justify-start gap-x-2 text-sm text-gray-500 w-full">
                            <Mail size={16} />
                            <span>{student.email}</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-x-2 text-sm text-gray-500 w-full">
                            <Phone size={16} />
                            <span> {student.phone}</span>
                        </li>
                    </ul>

                    <StudentSummary student={student} />
                </div>
            </CardContent>
        </Card>
    );
};
