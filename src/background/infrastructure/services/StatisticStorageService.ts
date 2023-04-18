export interface StatisticStorageService {
	getTimeWatched(options: { days: number }): Promise<number>;
	setState(state: Record<string, Record<string, number>>): void;
}
