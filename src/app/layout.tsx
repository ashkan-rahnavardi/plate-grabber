import { GetForms } from '@/actions/actions';
import { authOptions } from '@/lib/authOptions';
import { FormsProvider } from '@/services/FormsProvider';
import { ThemeProvider } from '@/services/theme-provider';
import '@/styles/globals.css';
import { GetFormsReturn, LicenseForm } from '@/types/licenseForm';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import SessionProvider from '../services/SessionProvider';

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

	let forms: LicenseForm[] = [];

	if (session && session.user) {
		let formResponse: GetFormsReturn = await GetForms(
			session.user.email as string
		);
		if (formResponse.success && formResponse.data) {
			forms = formResponse.data;
		} else {
			// Can do something more useful here, depending on if there was no email
			// or if there was an error
			console.log(formResponse.message);
		}
	} else {
		redirect('/api/auth/signin');
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Plate Grabber</title>
			</head>
			<body className={inter.className}>
				<SessionProvider session={session}>
					<FormsProvider formsData={forms}>
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
					</FormsProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
