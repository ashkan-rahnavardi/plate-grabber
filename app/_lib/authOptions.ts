import clientPromise from '@/app/_lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	// debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise),
};
