export interface VideoService {
	getVideoChannel(): string;
	getVideoId(): string;
	getVideoHTMLElement(): HTMLVideoElement | null;
	getVideoTags(): string[];
	getVideoTitle(): string;
}
