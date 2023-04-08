import {
	StatisticsState,
	StatisticsStorageService,
} from '../domain/StatisticsStorageService';

const STATISTICS_KEY = 'statistics';

export default class StatisticsStorageServiceImpl
	implements StatisticsStorageService
{
	private state?: StatisticsState;

	getState(): Promise<StatisticsState> {
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

	setState(state: StatisticsState) {
		Object.keys(state).forEach((key) => {
			if (!this.state) this.state = {};
			this.state[key] =
				key in this.state ? this.state[key] + state[key] : state[key];
		});

		chrome.storage.local.set({ [STATISTICS_KEY]: this.state || {} });
	}
}
