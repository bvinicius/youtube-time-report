export type StatisticsState = Record<string, Record<string, number>>;

export interface StatisticsStorageService {
	getState(): Promise<StatisticsState>;
	setState(state: StatisticsState): void;
}
