'use client';

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

import { toast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
	reference: z.string().min(1, {
		message: 'Reference is required.',
	}),
	street: z.string().optional(),
	roadType: z.string().optional(),
	blocks: z.string().optional(),
	sides: z.string().optional(),
	wording: z.string().optional(),
	date: z.string().optional(),
	time: z.string().optional(),
});

export default function ProfileForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
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
	// function onSubmit(values: z.infer<typeof formSchema>) {
	// 	// Do something with the form values.
	// 	// ✅ This will be type-safe and validated.
	// 	console.log(values);
	// }

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		console.log(data);
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
				<div className="flex justify-between">
					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Install Time</FormLabel>
								<FormControl>
									<Input {...field} type="time" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Install Date</FormLabel>
								<FormControl>
									<Input {...field} type="date" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
