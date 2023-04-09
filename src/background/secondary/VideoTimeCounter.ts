import { StatisticsStorageService } from '../domain/StatisticsStorageService';
import { isoDate } from './utils/date-utils';

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
			return;
		}

		console.log('disableCounter');

		clearInterval(this.interval);
		this.interval = undefined;
		this.commitCounters();
	}

	private incrementCounter(videoId: string) {
		console.log('incrementCounter', videoId);

		this.counters[videoId] = this.counters[videoId]
			? this.counters[videoId] + 1
			: 1;
	}

	private commitCounters() {
		console.log('commitCounters', this.counters);

		const today = isoDate(new Date());
		this.statisticsService.setState({ [today]: this.counters });
		this.counters = {};
		this.commitCounter = 0;
	}
}
