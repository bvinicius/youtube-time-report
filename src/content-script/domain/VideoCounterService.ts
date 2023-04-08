export interface VideoCounterService {
	enableCounter(videoId: string): void;
	disableCounter(videoId: string): void;
}
