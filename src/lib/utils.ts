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
export function parseRangeToHundreds(range: string): string[] {
	// Convert start and end to Numbers, then round down to the nearest 100
	const [start, end] = range
		.split('-')
		.map((num) => Math.floor(Number(num) / 100) * 100);

	// Create a list of strings from start to end, in increments of 100
	return Array.from({ length: (end - start) / 100 + 1 }, (_, i) =>
		(start + i * 100).toString()
	);
}

export function validateStreet(street: string) {
	const types = [
		'St',
		'Ave',
		'Blvd',
		'Rd',
		'Dr',
		'Cres',
		'Ct',
		'Ln',
		'Pl',
		'Way',
		'Cir',
		'Xing',
		'Hwy',
		'Loop',
		'Pass',
	];

	const streetRegex = /^[a-zA-Z\s]+$/;
	return streetRegex.test(street);
}

/**
 * Converts a Mongoose Document or any nested structure containing Mongoose Documents
 * into a plain JavaScript object. This includes converting `_id` fields from ObjectId to string
 * and handling arrays and nested objects.
 *
 * @param obj - The input object to convert, can be a Mongoose Document or a plain object.
 * @returns A plain JavaScript object with all Mongoose Document instances converted.
 */
export function convertToPlainObject(
	obj: Document | Record<string, any>
): Record<string, any> {
	// If the input object is a Mongoose Document, use .toObject() to get a plain object.
	// Otherwise, create a shallow copy of the object to avoid mutating the input directly.
	const result: Record<string, any> =
		obj instanceof Document ? obj.toObject() : { ...obj };

	// If the object has an _id field and it's an ObjectId, convert it to a string.
	if (result._id?.toString) {
		result._id = result._id.toString();
	}

	// Iterate over the keys of the result object to process nested objects and arrays.
	Object.keys(result).forEach((key) => {
		// If the property is a Mongoose Document, recursively convert it to a plain object.
		if (result[key] instanceof Document) {
			result[key] = convertToPlainObject(result[key]);
		}
		// If the property is an array, map over it, applying convertToPlainObject to each item.
		// This handles arrays of Documents, nested objects within arrays, etc.
		else if (Array.isArray(result[key])) {
			result[key] = result[key].map((item: Document | Record<string, any>) =>
				convertToPlainObject(item)
			);
		}
		// If the property is an object (but not null, an array, or a Document), recursively convert it.
		else if (typeof result[key] === 'object' && result[key] !== null) {
			result[key] = convertToPlainObject(result[key]);
		}
	});

	// Return the fully converted plain object, suitable for JSON serialization or use in contexts
	// where Mongoose Document methods and properties are not needed.
	return result;
}
