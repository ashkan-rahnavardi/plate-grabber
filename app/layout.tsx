import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import SessionProvider from './_helper/SessionProvider';
import { StorageProvider } from './_helper/storageContext';
import { authOptions } from './api/auth/[...nextauth]/route';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Plate Grabber',
	description: 'Iggys Plate Grabber',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<head>
				<title>Plate Grabber</title>
			</head>
			<body className={inter.className}>
				<SessionProvider session={session}>
					{!session || !session.user ? (
						redirect('/api/auth/signin')
					) : (
						<StorageProvider>{children}</StorageProvider>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
