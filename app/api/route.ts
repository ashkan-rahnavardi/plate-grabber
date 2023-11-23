import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const imageBody = await request.json();
		const image = imageBody.image;
		const key: string = process.env.PLATE_KEY as string;

		const formData = new FormData();
		formData.append('upload', image);
		formData.append('regions', 'us-ca');

		const apiResponse = await fetch(
			'https://api.platerecognizer.com/v1/plate-reader/',
			{
				method: 'POST',
				headers: {
					Authorization: key,
				},
				body: formData,
			}
		);

		const jsonResponse = await apiResponse.json();

		const plate = jsonResponse.results[0].plate;

		return NextResponse.json({ plate: plate });
	} catch (error) {
		return NextResponse.json({ plate: 'Plate not found' });
	}
}
