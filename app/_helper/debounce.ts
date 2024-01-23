function debounce<F extends (...args: any[]) => void>(
	func: F,
	waitFor: number
): (...args: Parameters<F>) => void {
	let timeoutId: number;

	return function (...args: Parameters<F>) {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = window.setTimeout(
			() => func(...args),
			waitFor
		) as unknown as number;
	};
}

export default debounce;
