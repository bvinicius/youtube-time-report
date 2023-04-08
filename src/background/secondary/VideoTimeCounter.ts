import { StatisticsStorageService } from '../domain/StatisticsStorageService';

const COMMIT_COUNTER_INTERVAL = 10;

export default class VideoTimeCounter {
	constructor(private statisticsService: StatisticsStorageService) {}
	private currentVideoId?: string;
	private counters: Record<string, number> = {};
	private interval?: NodeJS.Timer;
	private commitCounter = 0;

	private get isCounterRunning() {
		return !!this.interval;
	}

	enableCounter(videoId?: string) {
		if (this.isCounterRunning) {
			console.log('counter already ENABLED. skipping...');
			return;
		}
		if (videoId) {
			this.currentVideoId = videoId;
		}
		const video = videoId || this.currentVideoId;
		if (!video) return;

		console.log('enableCounter');

		const oneSecond = 1000;
		this.interval = setInterval(() => {
			this.incrementCounter(video);
			this.commitCounter++;
			if (this.commitCounter === COMMIT_COUNTER_INTERVAL) {
				this.commitCounters();
			}
		}, oneSecond);
	}

	disableCounter() {
		if (!this.isCounterRunning) {
			console.log('counter already DISABLED. skipping...');
			return;
		}

		console.log('disableCounter');

		clearInterval(this.interval);
		this.interval = undefined;
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
