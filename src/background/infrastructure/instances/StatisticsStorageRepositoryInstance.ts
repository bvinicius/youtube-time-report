import { WatchingDataMessageDto } from '../dto/WatchingDataMessageDto';
import {
	StatisticsState,
	StatisticStorageRepository,
} from '../repositories/StatisticStorageRepository';
import { isoDate, subtractDays } from '../utils/date-utils';

const STATISTICS_KEY = 'statistics';
const defaultOptions = { days: 7 };

export default class StatisticStorageReposisotyInstance
	implements StatisticStorageRepository
{
	private state?: StatisticsState;

	private getStoredData(): Promise<StatisticsState> {
		if (this.state) {
			return Promise.resolve(this.state);
		}
		return new Promise((resolve) => {
			chrome.storage.local.get(STATISTICS_KEY, (result) => {
				this.state = result.statistics || {};
				resolve(this.state || {});
			});
		});
	}

	async getState(
		options: WatchingDataMessageDto['payload'] = defaultOptions
	): Promise<StatisticsState> {
		const data = await this.getStoredData();
		const startDay = subtractDays(new Date(), options.days);

		const result = {};

		Object.keys(data)
			.filter((date) => new Date(date) >= startDay)
			.forEach((key) => {
				Object.assign(result, { [key]: data[key] });
			});

		console.log('STATE GOT: ', result);

		return result;
	}

	setState(state: StatisticsState) {
		console.log('setState', state);

		Object.keys(state).forEach((date) => {
			const videoTimes = state[date];
			Object.keys(videoTimes).forEach((videoId) => {
				const time = videoTimes[videoId];
				if (!this.state) this.state = {};
				if (!this.state[date]) this.state[date] = {};

				this.state[date][videoId] =
					videoId in this.state[date]
						? this.state[date][videoId] + time
						: time;
			});
		});

		chrome.storage.local.set({ statistics: this.state });
	}
}
