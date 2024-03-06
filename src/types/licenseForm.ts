export type Blocks = {
	_id?: string;
	number: string;
	side: string;
	plates: string[];
};

export type Street = {
	_id?: string;
	name: string;
	blocks: Blocks[];
};

export type LicenseForm = {
	_id?: string;
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
	location: Street[];
	// plates: Record<string, string[]>;
	// [key: string]: string | string[] | Record<string, string[]>;
};

export type GetFormsReturn = {
	success: boolean;
	data?: LicenseForm[];
	message?: string;
};
