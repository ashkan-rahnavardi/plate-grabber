import { LicenseForm } from '@/types/licenseForm';
import { clsx, type ClassValue } from 'clsx';
import { Document } from 'mongoose';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/* Returns the Initials of a given name*/
export function getInitials(name: string) {
	return name
		.split(' ') // split name into parts by spaces
		.map((part) => part[0]) // get the first letter of each part
		.join('') // joing the first letters without spaces
		.toUpperCase(); // conver to upercase and return
}

/* Converts a range of numbers into a list, parsed by 100's
   e.g. 100-500 will become [100, 200, 300, 400, 500]

   Rounds down the start and end of the range to the nearest 100
   so 190-590 will become [100, 200, 300, 400, 500]
*/
export function parseRangeByHundreds(range: string): string[] {
	// Convert start and end to Numbers, then round down to the nearest 100
	const [start, end] = range
		.split('-')
		.map((num) => Math.floor(Number(num) / 100) * 100);

	// Create a list of strings from start to end, in increments of 100
	return Array.from({ length: (end - start) / 100 + 1 }, (_, i) =>
		(start + i * 100).toString()
	);
}

export function merge<T>(
	a: T[],
	b: T[],
	predicate: (aItem: T, bItem: T) => boolean = (a, b) => a === b
): T[] {
	const c: T[] = [...a]; // copy to avoid side effects
	b.forEach((bItem) => {
		if (!c.some((cItem) => predicate(bItem, cItem))) {
			c.push(bItem);
		}
	});
	return c;
}
