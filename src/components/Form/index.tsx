'use client';

import { FormsContext } from '@/services/FormsProvider';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

export default function Form() {
	const params = useParams();
	const forms = useContext(FormsContext);

	console.log('params', params);
	console.log('forms', forms);

	return <div>Hello</div>;
}

// { params }: { params: { id: string } }
