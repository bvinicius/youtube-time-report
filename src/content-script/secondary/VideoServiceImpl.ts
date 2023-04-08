import { VideoService } from '../domain/VideoService';

export default class VideoServiceImpl implements VideoService {
	getVideoChannel(): string | null {
		return 'TODO:channel';
	}
	getVideoId(): string | null {
		return 'TODO:id';
	}
	getVideoHTMLElement(): HTMLVideoElement | null {
		if (!location.href.includes('watch?v=')) {
			return null;
		}
		return document.querySelector('video');
	}
	getVideoTags(): string[] | null {
		return ['TODO:tags'];
	}
	getVideoTitle(): string | null {
		return 'TODO:title';
	}
}
