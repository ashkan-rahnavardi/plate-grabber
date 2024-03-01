'use client';

import { LicenseForm } from '@/types/licenseForm';
import React, { createContext, useContext, useState } from 'react';

type FormsContextType = LicenseForm[];

export const FormsContext = createContext<FormsContextType>([]);

interface FormsProviderProps {
	children: React.ReactNode;
	formsData: LicenseForm[];
}

export const FormsProvider: React.FC<FormsProviderProps> = ({
	children,
	formsData,
}) => {
	const [forms, setForms] = useState<LicenseForm[]>(formsData);

	return (
		<FormsContext.Provider value={forms}>{children}</FormsContext.Provider>
	);
};
