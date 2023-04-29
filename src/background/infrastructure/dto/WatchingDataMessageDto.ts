export type WatchingDataAveragePeriodicity = 'daily';

export interface WatchingDataMessageDto {
    type: 'watching-data';
    payload: {
        days: number;
        average?: WatchingDataAveragePeriodicity;
    };
}
