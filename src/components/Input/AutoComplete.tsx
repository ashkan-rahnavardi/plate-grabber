'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { AllStreets } from '@/lib/streetNames';
import { cn } from '@/lib/utils';

// const frameworks = [
// 	{
// 		value: 'next.js',
// 		label: 'Next.js',
// 	},
// 	{
// 		value: 'sveltekit',
// 		label: 'SvelteKit',
// 	},
// 	{
// 		value: 'nuxt.js',
// 		label: 'Nuxt.js',
// 	},
// 	{
// 		value: 'remix',
// 		label: 'Remix',
// 	},
// 	{
// 		value: 'astro',
// 		label: 'Astro',
// 	},
// ];

export function AutoComplete() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value || 'Select street...'}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search street..." />
					<CommandEmpty>No street found.</CommandEmpty>
					<CommandGroup>
						{/* {AllStreets.filter((street) =>
							street.toLowerCase().includes(value.toLowerCase())
						)
							.slice(0, 20)
							.map((street) => ( */}
						{AllStreets.map((street) => (
							<CommandItem
								key={street}
								value={street}
								onSelect={() => {
									setValue(street);
									setOpen(false);
								}}
							>
								<CheckIcon
									className={cn(
										'mr-2 h-4 w-4',
										value === street ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{street}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
		// <Popover open={open} onOpenChange={setOpen}>
		// 	<PopoverTrigger asChild>
		// 		<Button
		// 			variant="outline"
		// 			role="combobox"
		// 			aria-expanded={open}
		// 			className="w-[200px] justify-between"
		// 		>
		// 			{value
		// 				? frameworks.find((framework) => framework.value === value)?.label
		// 				: 'Select framework...'}
		// 			<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
		// 		</Button>
		// 	</PopoverTrigger>
		// 	<PopoverContent className="w-[200px] p-0">
		// 		<Command>
		// 			<CommandInput placeholder="Search framework..." />
		// 			<CommandEmpty>No framework found.</CommandEmpty>
		// 			<CommandGroup>
		// 				{frameworks.map((framework) => (
		// 					<CommandItem
		// 						key={framework.value}
		// 						value={framework.value}
		// 						onSelect={(currentValue) => {
		// 							setValue(currentValue === value ? '' : currentValue);
		// 							setOpen(false);
		// 						}}
		// 					>
		// 						<CheckIcon
		// 							className={cn(
		// 								'mr-2 h-4 w-4',
		// 								value === framework.value ? 'opacity-100' : 'opacity-0'
		// 							)}
		// 						/>
		// 						{framework.label}
		// 					</CommandItem>
		// 				))}
		// 			</CommandGroup>
		// 		</Command>
		// 	</PopoverContent>
		// </Popover>
	);
}
