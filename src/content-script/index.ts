import { VideoObserver } from './domain/VideoObserver';
import URLMutationObserver from './secondary/URLMutationObserver';
import VideoCounterServiceImpl from './secondary/VideoCounterServiceImpl';
import VideoObserverImpl from './secondary/VideoObserverImpl';
import VideoServiceImpl from './secondary/VideoServiceImpl';

let videoObserver: VideoObserver | null = null;

const videoCounterService = new VideoCounterServiceImpl();

init();
new URLMutationObserver(init).observe();

function init() {
	disableTimeCounter();
	videoObserver?.unobserve();

	const videoService = new VideoServiceImpl();
	const $video = videoService.getVideoHTMLElement();
	if (!$video) return;

	const videoId = videoService.getVideoId();

	if (!videoId) return;

	videoObserver = new VideoObserverImpl($video, {
		onVideoPlay: () => enableTimeCounter(videoId),
		onVideoPause: () => disableTimeCounter(),
	});
	videoObserver.observe();
}

function enableTimeCounter(videoId: string) {
	videoCounterService.enableCounter(videoId);
}

function disableTimeCounter() {
	videoCounterService.disableCounter();
}
