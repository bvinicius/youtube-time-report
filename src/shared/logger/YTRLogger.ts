export interface YTRLogger {
	log: (...args: any[]) => void;
	error: (...args: any[]) => void;
	warn: (...args: any[]) => void;
	info: (...args: any[]) => void;
}
