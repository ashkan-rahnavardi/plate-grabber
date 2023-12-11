export interface LicenseForm {
	id: string;
	reference: string;
	sides: string;
	hundred_blocks: string;
	current_block: string;
	street: string;
	road_type: string;
	sign_wording: string;
	install_date: string;
	install_time: string;
	crew: string;
	signature: string;
	plates: Record<string, string[]>;
	[key: string]: string | string[] | Record<string, string[]>;
}

class StorageHelper {
	private readonly storageKey: string;
	private blankForm: LicenseForm;
	private static instance: StorageHelper;

	constructor() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');

		this.storageKey = 'forms';
		this.blankForm = {
			id: 'current',
			reference: '',
			sides: '',
			hundred_blocks: '',
			current_block: '',
			street: '',
			road_type: '',
			sign_wording: '',
			install_date: `${year}-${month}-${day}`,
			install_time: '',
			crew: '',
			signature: '',
			plates: {
				'': [''],
			},
		};
	}

	public static getInstance(): StorageHelper {
		if (!StorageHelper.instance) {
			StorageHelper.instance = new StorageHelper();
		}

		return StorageHelper.instance;
	}

	private getForms(): LicenseForm[] {
		if (typeof window !== 'undefined' && window.localStorage) {
			const storedData = localStorage.getItem(this.storageKey);

			const emptyData = [this.blankForm];
			return storedData ? JSON.parse(storedData) : emptyData;
		} else {
			return [this.blankForm];
		}
	}

	private setForms(forms: LicenseForm[]): void {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.setItem(this.storageKey, JSON.stringify(forms));
		}
	}

	public saveCurrentForm(): boolean {
		const forms = this.getForms();
		const currentForm = this.getFormById('current');

		if (currentForm) {
			const currentReference = currentForm.reference.trim();
			const currentCrew = currentForm.crew.trim();
			const currentSignature = currentForm.signature.trim();

			if (
				currentReference === '' ||
				currentCrew === '' ||
				currentSignature === ''
			) {
				return false;
			} else {
				const existingFormIndex = forms.findIndex(
					(form) => form.id === currentReference
				);

				if (existingFormIndex !== -1) {
					// Update existing form in the array
					forms[existingFormIndex] = { ...currentForm };
					forms[existingFormIndex].id = currentReference; // Use spread operator to create a new object
				} else {
					// Add new form
					currentForm.id = currentReference;
					forms.push(currentForm);
				}

				this.setForms(forms);
				this.clearCurrentForm();
				return true;
			}
		}

		return false;
	}

	public getFormById(formId: string): LicenseForm | undefined {
		const forms = this.getForms();

		const form = forms.find((form) => form.id === formId);

		return form;
	}

	public updateFormProperty(property: string, value: any): void {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm[property] = value;
			this.setForms(forms);
		}
	}

	public getHundredBlocks(): string {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			return currentForm.hundred_blocks;
		}

		return '';
	}

	public addCurrentBlock(block: string) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			// set current block
			currentForm.current_block = block;
			// add block to hundred blocks if not already there
			if (currentForm.hundred_blocks === '') {
				currentForm.hundred_blocks = block;
			} else if (!currentForm.hundred_blocks.includes(block)) {
				currentForm.hundred_blocks = currentForm.hundred_blocks.concat(
					', ' + block
				);
			}
			this.setForms(forms);
		}
	}

	public getCurrentBlock(): string {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			return currentForm.current_block;
		}

		return '';
	}

	public addPlates(block: string, plate: string) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			if (!currentForm.plates[block]) {
				currentForm.plates[block] = [];
			}
			if (!currentForm.plates[block].includes(plate)) {
				currentForm.plates[block].push(plate);
			}
			this.setForms(forms);
		}
	}

	public updatePlate(block: string, plate: string, index: number) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm.plates[block][index] = plate;
			this.setForms(forms);
		}
	}

	public getPlates() {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			if (currentForm.plates['']) {
				delete currentForm.plates[''];
				this.setForms(forms);
			}
			return currentForm.plates;
		}

		return {};
	}

	public getFormIDs(): string[] {
		const forms = this.getForms();

		let ids = forms
			.map((form) => {
				return form.id;
			})
			.filter((id) => id !== 'current');

		return ids;
	}

	public changeCurrentForm(formId: string): void {
		// Loads formId into current form
		const forms = this.getForms();
		const targetForm = forms.find((form) => form.id === formId);
		const currentFormIndex = forms.findIndex((form) => form.id === 'current');

		if (targetForm !== undefined && currentFormIndex !== -1) {
			forms[currentFormIndex] = { ...targetForm };
			forms[currentFormIndex].id = 'current';
			this.setForms(forms);
		}
	}

	public clearCurrentForm(): void {
		const forms = this.getForms();
		const currentFormIndex = forms.findIndex((form) => form.id === 'current');

		const signature = forms[currentFormIndex].signature;
		const crew = forms[currentFormIndex].crew;

		if (currentFormIndex !== -1) {
			forms[currentFormIndex] = { ...this.blankForm };
			forms[currentFormIndex].signature = signature;
			forms[currentFormIndex].crew = crew;
			this.setForms(forms);
		}
	}

	public deleteAllForms(): void {
		const forms = this.getForms();

		forms.forEach((form) => {
			if (form.id !== 'current') {
				this.deleteForm(form.id);
			}
		});
	}

	public deleteForm(formId: string): void {
		const forms = this.getForms();
		const targetFormIndex = forms.findIndex((form) => form.id === formId);

		if (targetFormIndex !== -1) {
			forms.splice(targetFormIndex, 1);
			this.setForms(forms);
			this.clearCurrentForm();
		}
	}

	public deleteSelectedForms(formIds: string[]): void {
		const forms = this.getForms();

		formIds.forEach((formId) => {
			const targetFormIndex = forms.findIndex((form) => form.id === formId);

			if (targetFormIndex !== -1) {
				forms.splice(targetFormIndex, 1);
			}
		});

		this.setForms(forms);
		this.clearCurrentForm();
	}

	public downloadSelectedForms(formIds: string[]): void {
		let textData = '';

		const currentForm = this.getFormById('current');

		const title = `${currentForm?.signature}_${currentForm?.install_date}`;

		formIds.forEach((formId) => {
			const form = this.getFormById(formId);

			if (form) {
				textData += this.convertFormToText(form);
				textData += '\n\n';
			}
		});

		const blob = new Blob([textData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${title}_form.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	public downloadAllForms(): void {
		const formIDs = this.getFormIDs();
		let textData = '';

		const currentForm = this.getFormById('current');

		const title = `${currentForm?.signature}_${currentForm?.install_date}`;

		formIDs.forEach((formId) => {
			const form = this.getFormById(formId);

			if (form) {
				textData += this.convertFormToText(form);
				textData += '\n\n';
			}
		});

		const blob = new Blob([textData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${title}_form.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	public downloadForm(formId: string): void {
		const form = this.getFormById(formId);

		if (form) {
			const textData = this.convertFormToText(form);
			const blob = new Blob([textData], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = `${formId}_form.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	}

	private convertFormToText(form: LicenseForm): string {
		// Implement the logic to convert the form data to a text format
		// For example, you can iterate over the form properties and format them as text
		let text = '';

		for (const [key, value] of Object.entries(form)) {
			if (key === 'plates') {
				text += `${key}:\n`;
				for (const [block, plates] of Object.entries(value)) {
					text += `\t${block}: ${plates.join(', ')}\n`;
				}
				continue;
			} else if (key === 'id' || key === 'current_block') {
				continue;
			}
			text += `${key}: ${value}\n`;
		}

		return text;
	}
}

export default StorageHelper;
