import styles from '@/styles/Camera.module.css';
import React, { Component } from 'react';

interface CameraFeedPropsInterface {
	sendFile: any;
}

interface CameraFeedStateInteraface {
	avaialbleCamerasDevices: CameraDeviceInputInfoInterface[];
	selectCamerasDeviceById: string;
}

interface CameraDeviceInputInfoInterface {
	deviceId: string;
	groupId: string;
	kind: string;
	label: string;
}

export class CameraFeed extends Component<
	CameraFeedPropsInterface,
	CameraFeedStateInteraface
> {
	videoPlayer: any;
	canvas: any;

	constructor(props: CameraFeedPropsInterface) {
		super(props);
		this.state = {
			avaialbleCamerasDevices: [],
			selectCamerasDeviceById: '',
		};
	}

	/**
	 * when component mount, we'll initialize the camera api via the dom element of <video>
	 * @memberof CameraFeed
	 */
	async componentDidMount() {
		const cameras = await this.getListOfCameras();
		this.setState({
			avaialbleCamerasDevices: cameras,
		});

		this.initializeCamera(cameras);
	}

	/**
	 * initialize camear with the first devices that we can find.
	 * @param devices list of all avaialble devices (video inputs)
	 */
	initializeCamera(devices: CameraDeviceInputInfoInterface[]) {
		const firstDeviceWeFound = devices.find((device) => {
			return device;
		}) as CameraDeviceInputInfoInterface;

		this.setDevice(firstDeviceWeFound);
	}

	/**
	 *
	 * @returns array of objects of all video inputs
	 */
	async getListOfCameras() {
		if (!navigator.mediaDevices?.enumerateDevices) {
			console.log('enumerateDevices() not supported.');
		} else {
			let devices;

			try {
				devices = await navigator.mediaDevices.enumerateDevices();

				const camerasWithPermission = devices
					.filter((device) => device.kind === 'videoinput')
					.every((device) => device.label === '');

				if (camerasWithPermission) {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: {
							facingMode: { ideal: 'environment' },
						},
						audio: false,
					});

					devices = await navigator.mediaDevices.enumerateDevices();

					stream.getTracks().forEach((track) => track.stop());
				}

				const availableCameras = devices.filter(
					(device) => device.kind === 'videoinput'
				);

				return availableCameras;
			} catch (e) {
				console.log('error trying to fetch media devices:', e);
			}
		}
		return [];
	}

	/**
	 * Sets the active device and starts playing the feed
	 * @memberof CameraFeed
	 * @instance
	 */
	async setDevice(device: CameraDeviceInputInfoInterface) {
		this.setState({
			selectCamerasDeviceById: device.deviceId,
		});
		const { deviceId } = device;

		const stream = await navigator.mediaDevices
			.getUserMedia({ audio: false, video: { deviceId } })
			.catch((e) =>
				console.log(
					'getUserMedia not supported',
					navigator.mediaDevices,
					'with following error:',
					e
				)
			);

		if ('srcObject' in this.videoPlayer) {
			this.videoPlayer.srcObject = stream;
		} else {
			console.log('[no supported] couldnt find srcObject on video player');
		}

		setTimeout(() => {
			this.videoPlayer.play();
		}, 10);
	}

	/**
	 * capture photo from the canvas and convert it to jpeg base64 and feed it to a callback function coming as a prop
	 * @memberof CameraFeed
	 */
	capturePhoto = () => {
		const { sendFile } = this.props;
		const context = this.canvas.getContext('2d');
		context.drawImage(this.videoPlayer, 0, 0, 680, 360);
		const dataBase64 = this.canvas.toDataURL('image/jpeg');
		sendFile(dataBase64);
	};

	/**
	 *
	 * @param deviceId string of the device id we want to actively select
	 */
	pickCameraDevice = (deviceId: string) => {
		const device: CameraDeviceInputInfoInterface =
			this.state.avaialbleCamerasDevices.find(
				(device: CameraDeviceInputInfoInterface) => device.deviceId === deviceId
			) as CameraDeviceInputInfoInterface;
		this.setDevice(device);
	};

	render() {
		return (
			<div className={styles.camera_container}>
				<div className={styles.list_of_avaialble_cameras}>
					{
						<select
							onChange={(e) => this.pickCameraDevice(e.currentTarget.value)}
							value={this.state.selectCamerasDeviceById}
						>
							<option disabled>Select a Camera</option>§
							{this.state.avaialbleCamerasDevices.map(
								(camera: CameraDeviceInputInfoInterface) => {
									return (
										<option key={camera.deviceId} value={camera.deviceId}>
											{camera.label}
										</option>
									);
								}
							)}
						</select>
					}
				</div>
				<video
					ref={(ref) => (this.videoPlayer = ref)}
					playsInline={true}
					width="680"
					height="360"
				/>
				<div style={{ textAlign: 'center' }}>
					<button onClick={this.capturePhoto} className={styles.capture_photo}>
						Capture photo
					</button>
				</div>
				<div className={styles.stage}>
					<canvas width="680" height="360" ref={(ref) => (this.canvas = ref)} />
				</div>
			</div>
		);
	}
}
