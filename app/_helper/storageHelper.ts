import { info } from 'console';

// TO DO: Make saved forms autosave on change

interface LicenseForm {
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
	blankForm: LicenseForm;

	constructor() {
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
			install_date: '',
			install_time: '',
			crew: '',
			signature: '',
			plates: {
				'': [''],
			},
		};
	}

	private getForms(): LicenseForm[] {
		const storedData = localStorage.getItem(this.storageKey);

		const emptyData = [this.blankForm];
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
				this.clearCurrentForm();
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

	setCurrentBlock(block: string) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm.current_block = block;
			this.setForms(forms);
		}
	}

	getCurrentBlock(): string {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			return currentForm.current_block;
		}

		return '';
	}

	addPlates(block: string, plate: string) {
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

	updatePlate(block: string, plate: string, index: number) {
		const forms = this.getForms();
		const currentForm = forms.find((form) => form.id === 'current');

		if (currentForm) {
			currentForm.plates[block][index] = plate;
			this.setForms(forms);
		}
	}

	getPlates() {
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

	getFormIDs(): string[] {
		const forms = this.getForms();

		let ids = forms
			.map((form) => {
				return form.id;
			})
			.filter((id) => id !== 'current');

		return ids;
	}

	changeCurrentForm(formId: string): void {
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

	clearCurrentForm(): void {
		const forms = this.getForms();
		const currentFormIndex = forms.findIndex((form) => form.id === 'current');

		if (currentFormIndex !== -1) {
			forms[currentFormIndex] = { ...this.blankForm };
			this.setForms(forms);
		}
	}

	deleteForm(formId: string): void {
		const forms = this.getForms();
		const targetFormIndex = forms.findIndex((form) => form.id === formId);

		if (targetFormIndex !== -1) {
			forms.splice(targetFormIndex, 1);
			this.setForms(forms);
			this.clearCurrentForm();
		}
	}
}

export default StorageHelper;
