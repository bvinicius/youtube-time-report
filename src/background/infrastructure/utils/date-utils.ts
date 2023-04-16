export function isoDate(date: Date) {
	return date.toISOString().split('T')[0];
}
