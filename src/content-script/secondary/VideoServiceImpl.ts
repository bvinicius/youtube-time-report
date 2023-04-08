import { VideoService } from '../domain/VideoService';

export default class VideoServiceImpl implements VideoService {
	getVideoChannel(): string {
		throw new Error('Method not implemented.');
	}
	getVideoId(): string {
		throw new Error('Method not implemented.');
	}
	getVideoHTMLElement(): HTMLVideoElement | null {
		if (!location.href.includes('watch?v=')) {
			return null;
		}
		return document.querySelector('video');
	}
	getVideoTags(): string[] {
		throw new Error('Method not implemented.');
	}
	getVideoTitle(): string {
		throw new Error('Method not implemented.');
	}
}
