export default function FormInputs({
	data,
	handleChange,
}: {
	data: any;
	handleChange: (e: any) => void;
}) {
	return (
		<div className="flex-col p-4">
			<div className="input-container">
				<label className="label-style" htmlFor="Reference">
					Reference #:
				</label>
				<input
					className="input-style"
					type="text"
					id="Reference"
					name="Reference"
					value={data.Reference}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Sides">
					On side(s) of
				</label>
				<select
					className="input-style"
					id="Sides"
					name="Sides"
					value={data.Sides}
					onChange={handleChange}
				>
					<option value="front">Both</option>
					<option value="north">North</option>
					<option value="south">South</option>
					<option value="west">West</option>
					<option value="east">East</option>
				</select>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="HundredBlock">
					Hundred Block(s):{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="HundredBlock"
					name="HundredBlock"
					value={data.HundredBlock}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Street">
					Street/Lane:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Street"
					name="Street"
					value={data.Street}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="StreetType">
					Road Type:{' '}
				</label>
				<select
					id="StreetType"
					name="StreetType"
					value={data.StreetType}
					onChange={handleChange}
					className="input-style"
				>
					<option value="avenue">Avenue</option>
					<option value="street">Street</option>
					<option value="boulevard">Boulevard</option>
					<option value="crescent">Crescent</option>
					<option value="place">Place</option>
					<option value="drive">Drive</option>
				</select>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="SignWord">
					Sign Wording:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="SignWord"
					name="SignWord"
					value={data.SignWord}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="InstallDate">
					Install Date:{' '}
				</label>
				<input
					className="input-style"
					type="date"
					id="InstallDate"
					name="InstallDate"
					value={data.InstallDate}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="InstallTime">
					Install Time:{' '}
				</label>
				<input
					className="input-style"
					type="time"
					id="InstallTime"
					name="InstallTime"
					value={data.InstallTime}
					onChange={handleChange}
				/>
			</div>
			<div className="input-container">
				<label className="label-style" htmlFor="Crew">
					Crew Initials:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Crew"
					name="Crew"
					value={data.Crew}
					onChange={handleChange}
				/>
			</div>
			<div className="flex items-center">
				<label className="label-style" htmlFor="Signature">
					Signature:{' '}
				</label>
				<input
					className="input-style"
					type="text"
					id="Signature"
					name="Signature"
					value={data.Signature}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
