import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export default function ButtonIcon() {
	return (
		<Button variant="ghost" size="icon">
			<MagnifyingGlassIcon className="h-8 w-8" />
		</Button>
	);
}
