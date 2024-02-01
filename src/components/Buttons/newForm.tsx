import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export default function ButtonIcon() {
	return (
		<Button variant="default" size="iconCircle">
			<PlusIcon className="h-4 w-4" />
		</Button>
	);
}
