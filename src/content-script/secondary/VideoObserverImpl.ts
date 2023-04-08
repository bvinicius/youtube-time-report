import { VideoObserver } from '../domain/VideoObserver';

interface VideoObserverOptions {
	onVideoPlay: () => void;
	onVideoPause: () => void;
}

export default class VideoObserverImpl implements VideoObserver {
	private onVideoPlay: () => void;
	private onVideoPause: () => void;

	constructor(
		private video: HTMLVideoElement,
		{ onVideoPlay, onVideoPause }: VideoObserverOptions
	) {
		this.onVideoPlay = onVideoPlay;
		this.onVideoPause = onVideoPause;
	}

	observe() {
		if (!this.video.paused) {
			this.onVideoPlay();
		}
		this.video.addEventListener('play', this.onVideoPlay);
		this.video.addEventListener('pause', this.onVideoPause);
	}

	unobserve() {
		console.log('unobserve');
		this.video.removeEventListener('play', this.onVideoPlay);
		this.video.removeEventListener('pause', this.onVideoPause);
	}
}
