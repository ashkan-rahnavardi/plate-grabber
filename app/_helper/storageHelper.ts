import { info } from 'console';

// TO DO: finish add plate functioanlity and update plate functionality

interface LicenseForm {
	id: string;
	reference: string;
	sides: string;
	hundred_blocks: string;
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

	constructor() {
		this.storageKey = 'forms';
	}

	private getForms(): LicenseForm[] {
		const storedData = localStorage.getItem(this.storageKey);

		const emptyData = [
			{
				id: 'current',
				reference: '',
				sides: '',
				hundred_blocks: [''],
				street: '',
				road_type: '',
				sign_wording: '',
				install_date: '',
				install_time: '',
				crew: '',
				signature: '',
				plates: {
					'': [''],
				},
			},
		];

		return storedData ? JSON.parse(storedData) : emptyData;
	}

	private setForms(forms: LicenseForm[]): void {
		localStorage.setItem(this.storageKey, JSON.stringify(forms));
	}

	saveCurrentForm(): boolean {
		const forms = this.getForms();
		const currentForm = this.getFormById('current');

		if (currentForm) {
			const currentReference = currentForm.reference.trim();

			if (currentReference !== '') {
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
				return true;
			}

			return false;
		}

		return false;
	}

	getFormsList(): LicenseForm[] {
		return this.getForms();
	}

	getFormById(formId: string): LicenseForm | undefined {
		const forms = this.getForms();

		const form = forms.find((form) => form.id === formId);

		return form;
	}

	updateFormProperty(property: string, value: any): void {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm[property] = value;
			this.setForms(forms);
		}
	}

	updatePlates(block: string, plate: string) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm.plates[block].push(plate);
			this.setForms(forms);
		}
	}
}

export default StorageHelper;
