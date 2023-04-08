import { YoutubeVideo } from './YoutubeVideo';

export interface VideoCounterService {
	enableCounter(video: YoutubeVideo): void;
	disableCounter(video: YoutubeVideo): void;
}
