export interface VideoService {
    getVideoId(): string | null;
    getVideoHTMLElement(): HTMLVideoElement | null;
}
