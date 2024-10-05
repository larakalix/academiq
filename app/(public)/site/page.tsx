import React from "react";
import Auth from "@/components/auth";

export default async function Page() {
    return (
        <>
            <main className="lg:grid lg:min-h-[600px] xl:min-h-[100dvh]">
                <Auth />
            </main>
        </>
    );
}
