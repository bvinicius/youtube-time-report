import { VideoObserver } from './domain/VideoObserver';
import URLObserver from './secondary/URLObserver';
import VideoObserverImpl from './secondary/VideoObserverImpl';
import VideoServiceImpl from './secondary/VideoServiceImpl';

let videoObserver: VideoObserver | null = null;

init();
new URLObserver(init).observe();

function init() {
	console.log('init');
	videoObserver?.unobserve();

	const videoService = new VideoServiceImpl();
	const $video = videoService.getVideoHTMLElement();

	if (!$video) {
		return;
	}

	videoObserver = new VideoObserverImpl($video, {
		onVideoPlay,
		onVideoPause,
	});
	videoObserver.observe();
}

function onVideoPlay() {
	console.log('Video is playing');
}

function onVideoPause() {
	console.log('Video is paused');
}
