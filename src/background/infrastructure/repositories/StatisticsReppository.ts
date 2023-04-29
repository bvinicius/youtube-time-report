export type StatisticsState = Record<string, Record<string, number>>;

export interface StatisticsRepository {
    getState(): Promise<StatisticsState>;
    setState(state: StatisticsState): void;
}
