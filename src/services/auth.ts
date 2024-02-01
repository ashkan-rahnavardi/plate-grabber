import clientPromise from '@/database/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	// debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise),
});