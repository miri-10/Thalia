import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                // Add actual auth logic here or return mock user for now
                // For simple demo/MVP without full auth backend logic yet:
                if (credentials.email === "farmer@thalia.com" && credentials.password === "password") {
                    return { id: "1", name: "Ram Bahadur", email: "farmer@thalia.com", role: "farmer" }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token }) {
            return token
        }
    }
} satisfies NextAuthConfig
