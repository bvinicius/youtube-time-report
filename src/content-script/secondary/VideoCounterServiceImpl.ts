import { VideoCounterService } from '../domain/VideoCounterService';
import { YoutubeVideo } from '../domain/YoutubeVideo';

export interface VideoCounterMessage {
	type: 'enableCounter' | 'disableCounter';
	payload: YoutubeVideo;
}

export default class VideoCounterServiceImpl implements VideoCounterService {
	enableCounter(video: YoutubeVideo): void {
		chrome.runtime.sendMessage<VideoCounterMessage>({
			type: 'enableCounter',
			payload: video,
		});
	}

	disableCounter(video: YoutubeVideo): void {
		chrome.runtime.sendMessage<VideoCounterMessage>({
			type: 'disableCounter',
			payload: video,
		});
	}
}
