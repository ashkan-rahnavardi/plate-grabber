import { Toaster } from '@/components/ui/toaster';
import { authOptions } from '@/lib/authOptions';
import { ThemeProvider } from '@/services/theme-provider';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import SessionProvider from '../services/SessionProvider';
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
						<StorageProvider>
							<div className="relative flex min-h-screen flex-col bg-background p-2">
								<ThemeProvider
									attribute="class"
									defaultTheme="system"
									enableSystem
									disableTransitionOnChange
								>
									{children}
								</ThemeProvider>
							</div>
						</StorageProvider>
					)}
				</SessionProvider>

				<Toaster />
			</body>
		</html>
	);
}

// {!session || !session.user ? (
// 	(console.log('redirecting'), redirect('/api/auth/signin'))
// ) : (
// 	<div className="relative flex min-h-screen flex-col bg-background p-4">
// 		<ThemeProvider
// 			attribute="class"
// 			defaultTheme="system"
// 			enableSystem
// 			disableTransitionOnChange
// 		>
// 			{children}
// 		</ThemeProvider>
// 	</div>
// )}

// {!session || !session.user ? (
// 	redirect('/api/auth/signin')
// ) : (
// 	<div className="relative flex min-h-screen flex-col bg-background p-4">
// 		<ThemeProvider
// 			attribute="class"
// 			defaultTheme="system"
// 			enableSystem
// 			disableTransitionOnChange
// 		>
// 			{children}
// 		</ThemeProvider>
// 	</div>

// )}
