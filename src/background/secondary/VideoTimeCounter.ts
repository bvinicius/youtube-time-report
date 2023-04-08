import { StatisticsStorageService } from '../domain/StatisticsStorageService';

const COMMIT_COUNTER_INTERVAL = 10;

export default class VideoTimeCounter {
	constructor(private statisticsService: StatisticsStorageService) {}
	private counters: Record<string, number> = {};
	private interval?: NodeJS.Timer;
	private commitCounter = 0;

	enableCounter(videoId: string) {
		console.log('enableCounter');

		const oneSecond = 1000;
		this.interval = setInterval(() => {
			this.incrementCounter(videoId);
			this.commitCounter++;
			if (this.commitCounter === COMMIT_COUNTER_INTERVAL) {
				this.commitCounters();
			}
		}, oneSecond);
	}

	disableCounter() {
		console.log('disableCounter');

		clearInterval(this.interval);
		this.commitCounters();
	}

	private incrementCounter(videoId: string) {
		this.counters[videoId] = this.counters[videoId]
			? this.counters[videoId] + 1
			: 1;
	}

	private commitCounters() {
		this.statisticsService.setState(this.counters);
		this.counters = {};
		this.commitCounter = 0;
	}
}
