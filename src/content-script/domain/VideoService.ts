export interface VideoService {
	getVideoChannel(): string | null;
	getVideoId(): string | null;
	getVideoHTMLElement(): HTMLVideoElement | null;
	getVideoTags(): string[] | null;
	getVideoTitle(): string | null;
}
