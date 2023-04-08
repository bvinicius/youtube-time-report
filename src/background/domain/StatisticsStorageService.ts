export type StatisticsState = Record<string, number>;

export interface StatisticsStorageService {
	getState(): Promise<StatisticsState>;
	setState(state: StatisticsState): void;
}
