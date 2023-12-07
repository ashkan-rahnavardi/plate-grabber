import StorageHelper from '../_helper/storageHelper';

// Mock localStorage for testing purposes
global.localStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn(),
};

describe('StorageHelper', () => {
	let storageHelper;

	beforeEach(() => {
		storageHelper = new StorageHelper();
	});

	afterEach(() => {
		localStorage.getItem.mockClear();
		localStorage.setItem.mockClear();
		localStorage.clear.mockClear();
	});

	test('getInstance should return the same instance', () => {
		const instance1 = StorageHelper.getInstance();
		const instance2 = StorageHelper.getInstance();
		expect(instance1).toBe(instance2);
	});

	test('getForms should return an array of forms', () => {
		// Mock localStorage.getItem to return a stringified array
		localStorage.getItem.mockReturnValue(JSON.stringify([{ id: 'current' }]));

		const forms = storageHelper.getForms();

		expect(forms).toEqual([{ id: 'current' }]);
		expect(localStorage.getItem).toHaveBeenCalledWith('forms');
	});

	// Add more tests for other methods in the StorageHelper class
	// ...

	test('convertFormToText should return formatted text', () => {
		const form = {
			id: '1',
			reference: 'ref',
			sides: 'both',
			// ... other form properties
		};

		const result = storageHelper.convertFormToText(form);

		// Add assertions based on the expected text format
		expect(result).toContain('id: 1');
		expect(result).toContain('reference: ref');
		expect(result).toContain('sides: both');
		// ... assert other properties
	});
});
