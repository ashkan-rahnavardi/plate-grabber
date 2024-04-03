import { CameraFeed } from '@/containers/camera/camera-feed';

export default function Camera() {
	return (
		<div>
			<CameraFeed
				sendFile={(base64Image: string) =>
					console.log('file as base64:', base64Image)
				}
			/>
		</div>
	);
}
