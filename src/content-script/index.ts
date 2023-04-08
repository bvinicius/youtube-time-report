import { VideoObserver } from './domain/VideoObserver';
import URLObserver from './secondary/URLObserver';
import VideoCounterServiceImpl from './secondary/VideoCounterServiceImpl';
import VideoObserverImpl from './secondary/VideoObserverImpl';
import VideoServiceImpl from './secondary/VideoServiceImpl';

let videoObserver: VideoObserver | null = null;

const videoCounterService = new VideoCounterServiceImpl();

init();
new URLObserver(init).observe();

function init() {
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
	videoCounterService.enableCounter();
}

function onVideoPause() {
	videoCounterService.disableCounter();
}
