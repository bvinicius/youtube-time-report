export type StatisticsState = Record<string, Record<string, number>>;

export interface StatisticStorageRepository {
	getState(): Promise<StatisticsState>;
	setState(state: StatisticsState): void;
}
