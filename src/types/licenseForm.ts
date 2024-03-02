export type LicenseForm = {
	_id: string;
	reference: string;
	email: string;
	sides: string;
	hundredBlocks: string;
	street: string;
	roadType: string;
	signWording: string;
	installDate: string;
	installTime: string;
	crew: string;
	signature: string;
	// plates: Record<string, string[]>;
	// [key: string]: string | string[] | Record<string, string[]>;
};
