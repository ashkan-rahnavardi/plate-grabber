'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
	reference: z.string().min(1, {
		message: 'Reference is required.',
	}),
	street: z.string().optional(),
	roadType: z.string().optional(),
	blocks: z.string().optional(),
	sides: z.string().optional(),
	wording: z.string().optional(),
	date: z.date().optional(),
	time: z.string().optional(),
});

export default function ProfileForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			reference: '',
			street: '',
			roadType: '',
			blocks: '',
			sides: '',
			wording: '',
			// date: '',
			time: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="reference"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reference</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="street"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="roadType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Road Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a road type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Avenue">Avenue</SelectItem>
									<SelectItem value="Street">Street</SelectItem>
									<SelectItem value="Boulevard">Boulevard</SelectItem>
									<SelectItem value="Crescent">Crescent</SelectItem>
									<SelectItem value="Place">Place</SelectItem>
									<SelectItem value="Drive">Drive</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="blocks"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Blocks</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="sides"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sides</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select effected sides" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Both">Both</SelectItem>
									<SelectItem value="North">North</SelectItem>
									<SelectItem value="South">South</SelectItem>
									<SelectItem value="West">West</SelectItem>
									<SelectItem value="East">East</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="wording"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wording</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
