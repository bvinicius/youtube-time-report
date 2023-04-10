export interface VideoCounterService {
	enableCounter(videoId: string): void;
	disableCounter(): void;
}
