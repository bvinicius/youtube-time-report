import {
	StatisticsState,
	StatisticStorageRepository,
} from '../repositories/StatisticStorageRepository';

const STATISTICS_KEY = 'statistics';

export default class StatisticStorageReposisotyInstance
	implements StatisticStorageRepository
{
	private state?: StatisticsState;

	getState(): Promise<StatisticsState> {
		if (this.state) {
			return Promise.resolve(this.state);
		}
		return new Promise((resolve) => {
			chrome.storage.local.get(STATISTICS_KEY, (result) => {
				this.state = result.statistics || {};
				console.log('getState', this.state);
				resolve(this.state || {});
			});
		});
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
