'use client';

import React, { createContext, useContext } from 'react';
import StorageHelper from './storageHelper';

interface StorageProviderProps {
	children: React.ReactNode;
}

export type StorageHelperType = StorageHelper;

const StorageContext = createContext<StorageHelper | undefined>(undefined);

export const StorageProvider: React.FC<StorageProviderProps> = ({
	children,
}) => {
	const storageHelper = StorageHelper.getInstance();

	return (
		<StorageContext.Provider value={storageHelper}>
			{children}
		</StorageContext.Provider>
	);
};

export const useStorage = (): StorageHelper => {
	const storageHelper = useContext(StorageContext);
	if (!storageHelper) {
		throw new Error('useStorage must be used within a StorageProvider');
	}
	return storageHelper;
};
