import { clsx, type ClassValue } from 'clsx';
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
