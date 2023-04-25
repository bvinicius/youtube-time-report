import { WatchingDataAveragePeriodicity } from '../dto/WatchingDataMessageDto';
import { StatisticsRepository } from '../repositories/StatisticsReppository';
import { StatisticsService } from '../services/StatisticsService';
import { subtractDays } from '../utils/date-utils';

const defaultOptions = { days: 7 };

export class StatisticsServiceInstance implements StatisticsService {
	constructor(private storageRepository: StatisticsRepository) {}

	async getTimeWatched(
		options: { days: number } = defaultOptions
	): Promise<number> {
		const data = await this.storageRepository.getState();
		const startDay = subtractDays(new Date(), options.days);

		let result = 0;

		Object.keys(data)
			.filter((date) => new Date(date) >= startDay)
			.forEach((key) => {
				result += Object.values(data[key]).reduce((a, b) => a + b, 0);
			});

		return result;
	}

	async getAverageWatchingData(
		periodicity: WatchingDataAveragePeriodicity,
		count: number
	) {
		switch (periodicity) {
			case 'daily': {
				const time = await this.getTimeWatched({ days: count });
				return time / count;
			}
		}
	}

	setState(state: Record<string, Record<string, number>>) {
		this.storageRepository.setState(state);
	}
}
