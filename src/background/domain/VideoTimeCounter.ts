import { StatisticStorageRepository } from '../infrastructure/repositories/StatisticStorageRepository';
import { isoDate } from '../infrastructure/utils/date-utils';

const COMMIT_COUNTER_INTERVAL = 10;

export default class VideoTimeCounter {
	constructor(private statisticsService: StatisticStorageRepository) {}
	private counters: Record<string, number> = {};
	private interval?: NodeJS.Timer;
	private commitCounter = 0;

	private get isCounterRunning() {
		return !!this.interval;
	}

	enableCounter(videoId: string) {
		console.log('VideoTimeCounter.enableCounter', videoId);

		if (this.isCounterRunning) {
			return;
		}

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
		if (!this.isCounterRunning) {
			return;
		}

		clearInterval(this.interval);
		this.interval = undefined;
		this.commitCounters();
	}

	private incrementCounter(videoId: string) {
		console.log('Going to increment', videoId);

		this.counters[videoId] = this.counters[videoId]
			? this.counters[videoId] + 1
			: 1;
	}

	private commitCounters() {
		const today = isoDate(new Date());
		this.statisticsService.setState({ [today]: this.counters });
		this.counters = {};
		this.commitCounter = 0;
	}
}
