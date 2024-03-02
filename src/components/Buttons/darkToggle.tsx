'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
	const [mounted, setMounted] = useState(false);
	const { setTheme } = useTheme();

	// useEffect only runs on the client
	useEffect(() => setMounted(true), []);

	// render a skeleton while waiting for theme
	if (!mounted)
		return (
			<Button variant="outline" size="icon">
				<Skeleton className="h-[1.2rem] w-[1.2rem] rounded-full" />
			</Button>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// export default function ModeToggle() {
// 	const { setTheme } = useTheme();

// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<Button variant="outline" size="icon">
// 					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
// 					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
// 					<span className="sr-only">Toggle theme</span>
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent align="end">
// 				<DropdownMenuItem onClick={() => setTheme('light')}>
// 					Light
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('dark')}>
// 					Dark
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('system')}>
// 					System
// 				</DropdownMenuItem>
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// }
