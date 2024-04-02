import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function FormNav() {
	return (
		<div className="flex w-full justify-between">
			<Button asChild variant="default" size="iconCircle">
				<Link href="/">
					<ArrowLeftIcon className="h-6 w-6" />
				</Link>
			</Button>
		</div>
	);
}
