'use client';

import { FormsContext } from '@/services/FormsProvider';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

export default function Form() {
	const params = useParams();
	const forms = useContext(FormsContext);

	console.log('params from form/index', params.id);
	console.log('forms from form/index', forms);

	return <div>Hello</div>;
}

// { params }: { params: { id: string } }
