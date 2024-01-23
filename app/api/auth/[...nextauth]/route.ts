import clientPromise from '@/app/_lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise),
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
