import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { auth } from '../services/auth';
import { StorageProvider } from '../services/storageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Plate Grabber',
	description: 'Plate Grabber',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<html lang="en">
			<head>
				<title>Plate Grabber</title>
			</head>
			<body className={inter.className}>
				{!session || !session.user ? (
					redirect('/api/auth/signin')
				) : (
					<StorageProvider>
						<div className="relative flex min-h-screen flex-col bg-background p-2">
							<main className="flex-1">{children}</main>
						</div>
					</StorageProvider>
				)}
			</body>
		</html>
	);
}
