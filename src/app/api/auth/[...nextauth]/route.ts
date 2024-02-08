import { authOptions } from '@/lib/authOptions';
import NextAuth from 'next-auth';

// export const authOptions = {
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
// 		}),
// 	],
// 	debug: process.env.NODE_ENV === 'development',
// 	adapter: MongoDBAdapter(clientPromise),
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
