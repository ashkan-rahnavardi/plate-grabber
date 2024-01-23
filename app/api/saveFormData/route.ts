import dbConnect from '@/app/_lib/dbConnect';
import FormModel from '@/models/form';
import { NextResponse } from 'next/server';

// TO DO: Save post to database

export async function GET() {
	const con = await dbConnect();
	return new NextResponse(JSON.stringify({ message: 'connected to db' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function POST(request: Request) {
	const con = await dbConnect();

	const form = new FormModel({
		name: 'test',
		street: 'test',
	});

	try {
		const data = await request.json();
		console.log(data);
		return new NextResponse(JSON.stringify({ message: 'saved' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ error: err }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
