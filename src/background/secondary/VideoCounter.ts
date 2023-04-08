import { StatisticsStorageService } from '../domain/StatisticsStorageService';
import { ContentYoutubeVideo } from './ContentVideoCounterMessage';

export default class VideoCounter {
	constructor(private statisticsService: StatisticsStorageService) {}
	private counter: number = 0;
	private interval?: NodeJS.Timer;

	enableCounter(video: ContentYoutubeVideo) {
		const second = 1000;
		this.interval = setInterval(() => {
			this.counter++;
			this.statisticsService.incrementState({
				[video.id]: {
					channel: video.channel,
					title: video.title,
					tags: video.tags,
					timeWatched: this.counter,
				},
			});
		}, second);
	}

	disableCounter() {
		clearInterval(this.interval);
	}
}
