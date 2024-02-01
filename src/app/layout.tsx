import { ThemeProvider } from '@/services/theme-provider';
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
					<div className="relative flex min-h-screen flex-col bg-background p-4">
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</div>
				)}
			</body>
		</html>
	);
}

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
