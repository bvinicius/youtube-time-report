import { StatisticStorageService } from '../infrastructure/services/StatisticStorageService';
import { isoDate } from '../infrastructure/utils/date-utils';

const COMMIT_COUNTER_INTERVAL = 10;

export default class VideoTimeCounter {
	constructor(private statisticsService: StatisticStorageService) {}
	private counters: Record<string, number> = {};
	private interval?: NodeJS.Timer;
	private commitCounter = 0;

	private get isCounterRunning() {
		return !!this.interval;
	}

	enableCounter(videoId: string) {
		if (this.isCounterRunning) {
			return;
		}

		const oneSecond = 1000;
		this.interval = setInterval(() => {
			this.incrementCounter(videoId);
			this.commitCounter++;
			if (this.commitCounter === COMMIT_COUNTER_INTERVAL) {
				this.commit();
			}
		}, oneSecond);
	}

	disableCounter() {
		if (!this.isCounterRunning) {
			return;
		}

		clearInterval(this.interval);
		this.interval = undefined;
		this.commit();
	}

	private incrementCounter(videoId: string) {
		this.counters[videoId] = this.counters[videoId]
			? this.counters[videoId] + 1
			: 1;
	}

	private commit() {
		const today = isoDate(new Date());
		this.statisticsService.setState({ [today]: this.counters });
		this.counters = {};
		this.commitCounter = 0;
	}
}
