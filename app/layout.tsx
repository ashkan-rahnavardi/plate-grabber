import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StorageProvider } from './_helper/storageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Plate Grabber',
	description: 'Iggys Plate Grabber',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<StorageProvider>{children}</StorageProvider>
			</body>
		</html>
	);
}
