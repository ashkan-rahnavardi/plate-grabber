import clientPromise from '@/database/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const config = {
	providers: [GoogleProvider],
	adapter: MongoDBAdapter(clientPromise),
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// export const config = {
// 	handlers: { GET, POST },
// 	auth,
// } = NextAuth({
// 	providers: [
// GoogleProvider({
// 	clientId: process.env.GOOGLE_CLIENT_ID ?? '',
// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
// }),
// 	],
// 	// debug: process.env.NODE_ENV === 'development',
// 	adapter: MongoDBAdapter(clientPromise),
// });
