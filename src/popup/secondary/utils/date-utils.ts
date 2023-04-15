export const duration = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const min = Math.floor((seconds - hours * 3600) / 60);

	const hoursStr = hours > 0 ? `${hours}h ` : '';
	const minStr = min > 0 ? `${min}min ` : '';

	return `${hoursStr}${minStr}`;
};
