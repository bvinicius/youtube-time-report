export type StatisticsState = Record<
	string,
	{
		channel: string;
		title: string;
		tags: string[];
		timeWatched: number;
	}
>;

export interface StatisticsStorageService {
	getState(): Promise<StatisticsState>;
	incrementState(state: StatisticsState): void;
}
