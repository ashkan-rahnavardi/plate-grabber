import { useState } from 'react';

export default function SaveForm() {
	const [showModal, setShowModal] = useState(false);
	const [errorSaving, setErrorSaving] = useState(false);

	const requiredFields = ['reference', 'street/lane'];

	const handleSave = () => {
		const currentForm = JSON.parse(localStorage.getItem('current') || '{}');
	};
}
