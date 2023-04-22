import {
	StatisticsState,
	StatisticStorageRepository,
} from '../repositories/StatisticStorageRepository';
import { StorageSystem } from '../repositories/StorageSystem';

const STATISTICS_KEY = 'statistics';

export default class StatisticStorageReposisotyInstance
	implements StatisticStorageRepository
{
	constructor(private storage: StorageSystem) {}

	private state?: StatisticsState;

	getState(): Promise<StatisticsState> {
		if (this.state) {
			return Promise.resolve(this.state);
		}
		return new Promise((resolve) => {
			this.storage.get<StatisticsState>(STATISTICS_KEY).then((result) => {
				this.state = result || {};
				resolve(this.state || {});
			});
		});
	}

	setState(state: StatisticsState) {
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

		this.storage.set(STATISTICS_KEY, this.state);
	}
}
