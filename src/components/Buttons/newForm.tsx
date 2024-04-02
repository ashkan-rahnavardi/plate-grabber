import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function ButtonIcon() {
	return (
		<Button asChild variant="default" size="iconCircle">
			<Link href="/form/new">
				<PlusIcon className="h-6 w-6" />
			</Link>
		</Button>
	);
}
