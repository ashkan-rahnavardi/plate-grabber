import StorageHelper, { LicenseForm } from '../_helper/storageHelper';

describe('StorageHelper', () => {
	// Test case for getInstance method
	it('should return the same instance of StorageHelper', () => {
		const instance1 = StorageHelper.getInstance();
		const instance2 = StorageHelper.getInstance();

		expect(instance1).toBe(instance2);
	});

	// Add more test cases as needed

	// For example, you can test that the instance has the correct initial values
	it('should have the correct initial values', () => {
		const instance = StorageHelper.getInstance();

		// Replace this with your actual initial values
		const expectedBlankForm: LicenseForm = {
			id: 'current',
			reference: '',
			sides: '',
			hundred_blocks: '',
			current_block: '',
			street: '',
			road_type: '',
			sign_wording: '',
			install_date: '2023-12-07', // Replace with the current date
			install_time: '',
			crew: '',
			signature: '',
			plates: {
				'': [''],
			},
		};

		expect(instance['blankForm']).toEqual(expectedBlankForm);
	});
});
