export type LicenseForm = {
	id: string;
	reference: string;
	sides: string;
	hundred_blocks: string;
	current_block: string;
	street: string;
	road_type: string;
	sign_wording: string;
	installDate: string;
	install_time: string;
	crew: string;
	signature: string;
	plates: Record<string, string[]>;
	[key: string]: string | string[] | Record<string, string[]>;
};
