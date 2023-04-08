import {
	StatisticsState,
	StatisticsStorageService,
} from '../domain/StatisticsStorageService';

export default class StatisticsStorageServiceImpl
	implements StatisticsStorageService
{
	private state?: StatisticsState;

	getState(): Promise<StatisticsState> {
		if (this.state) {
			return Promise.resolve(this.state);
		}
		return new Promise((resolve) => {
			chrome.storage.local.get('statistics', (result) => {
				console.log('storage result', result);

				this.state = result.statistics || {};
				resolve(this.state || {});
			});
		});
	}

	incrementState(state: StatisticsState) {
		Object.keys(state).forEach((key) => {
			if (!this.state) this.state = {};
			this.state[key] = {
				channel: state[key].channel,
				title: state[key].title,
				tags: state[key].tags,
				timeWatched: key in state ? state[key].timeWatched + 1 : 1,
			};
		});

		console.log('incrementState', this.state);

		chrome.storage.local.set({ statistics: this.state || {} });
	}
}
