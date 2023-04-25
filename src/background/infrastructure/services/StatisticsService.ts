import { WatchingDataAveragePeriodicity } from '../dto/WatchingDataMessageDto';

export interface StatisticsService {
	getTimeWatched(options: { days: number }): Promise<number>;
	getAverageWatchingData(
		periodicity: WatchingDataAveragePeriodicity,
		count: number
	): Promise<number>;
	setState(state: Record<string, Record<string, number>>): void;
}
