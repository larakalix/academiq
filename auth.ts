import { compare } from "bcrypt";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import type { Teacher } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: Teacher;
    }

    interface JWT {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize({
                email,
                password,
            }: (typeof CredentialsProvider.arguments)[0]["credentials"]) {
                if (!email || !password) return null;

                const user = await prisma.teacher.findUnique({
                    where: { email },
                });

                if (!user) return null;

                const isPasswordValid = await compare(password, user.password);

                if (!isPasswordValid) return null;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...rest } = user;

                return {
                    ...rest,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const u = user as unknown as any;
                return {
                    id: u.id,
                    ...token,
                    ...u,
                };
            }
            return token;
        },
    },
};

export const auth = async () => await getServerSession(authOptions);
