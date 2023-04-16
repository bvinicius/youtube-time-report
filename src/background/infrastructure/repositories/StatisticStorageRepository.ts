import { WatchingDataMessageDto } from '../dto/WatchingDataMessageDto';

export type StatisticsState = Record<string, Record<string, number>>;

export interface StatisticStorageRepository {
	getState(
		options?: WatchingDataMessageDto['payload']
	): Promise<StatisticsState>;
	setState(state: StatisticsState): void;
}
