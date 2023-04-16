import { WatchingDataMessageDto } from '../dto/WatchingDataMessageDto';

export type StatisticsState = Record<string, Record<string, number>>;

export interface StatisticStorageRepository {
	getTimeWatched(
		options?: WatchingDataMessageDto['payload']
	): Promise<number>;
	setState(state: StatisticsState): void;
}
