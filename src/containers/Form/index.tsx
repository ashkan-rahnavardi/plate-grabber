'use client';

import { FormsContext } from '@/services/FormsProvider';
import { useParams } from 'next/navigation';
import { useContext, useState } from 'react';

export default function Form() {
	const params = useParams();
	const forms = useContext(FormsContext);
	const [form, setForm] = useState(
		forms.find((form) => form.reference === params.id)
	);

	console.log('params from form/index', params.id);
	console.log('form from form/index', form);

	return <div>Hello</div>;
}
