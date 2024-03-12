'use client';

import { LicenseForm } from '@/types/licenseForm';
import React, { createContext, useContext, useState } from 'react';

interface FormsContextType {
	forms: LicenseForm[];
	updateForms: (updatedForms: LicenseForm[]) => void;
}

export const FormsContext = createContext<FormsContextType>({
	forms: [],
	updateForms: () => {},
});

interface FormsProviderProps {
	children: React.ReactNode;
	formsData: LicenseForm[];
}

export const FormsProvider: React.FC<FormsProviderProps> = ({
	children,
	formsData,
}) => {
	const [forms, setForms] = useState<LicenseForm[]>(formsData);

	const updateForms = (updatedForms: LicenseForm[]) => {
		setForms(updatedForms);
	};

	return (
		<FormsContext.Provider value={{ forms, updateForms }}>
			{children}
		</FormsContext.Provider>
	);
};
