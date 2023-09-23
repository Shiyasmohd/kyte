import NextAuth, { Account, NextAuthOptions, Profile, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import Auth0Provider from 'next-auth/providers/auth0';
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_API_KEY as string,
            clientSecret: process.env.TWITTER_SECRET_KEY as string,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt(params: { token: JWT; user: AdapterUser | User; account: Account | null; profile?: Profile | undefined; trigger?: "update" | "signIn" | "signUp" | undefined; isNewUser?: boolean | undefined; session?: any; }) {
            if (params.token.sub == process.env.ADMIN_1 || params.token.sub == process.env.ADMIN_2) {
                params.token.role = "admin"
            } else {
                params.token.role = "user"
            }
            return params.token;
        },
        async session({ session, token }: any) {

            session.publicKey = token.sub;
            if (session.user) {
                session.user.name = token.sub;
            }
            return session;
        },
    },
};




const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
