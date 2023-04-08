import { VideoObserver } from './domain/VideoObserver';
import { YoutubeVideo } from './domain/YoutubeVideo';
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

	const youtubeVideo: YoutubeVideo = {
		id: videoService.getVideoId(),
		title: videoService.getVideoTitle(),
		channel: videoService.getVideoChannel(),
		tags: videoService.getVideoTags(),
	};

	console.log(youtubeVideo);

	videoObserver = new VideoObserverImpl($video, {
		onVideoPlay: () => onVideoPlay(youtubeVideo),
		onVideoPause: () => onVideoPause(youtubeVideo),
	});
	videoObserver.observe();
}

function onVideoPlay(video: YoutubeVideo) {
	videoCounterService.enableCounter(video);
}

function onVideoPause(video: YoutubeVideo) {
	videoCounterService.disableCounter(video);
}
