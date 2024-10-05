import { AuthProvider } from "@/provider/auth-provider";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <AppProvider>
        <AuthProvider>{children}</AuthProvider>
        // </AppProvider>
    );
}
