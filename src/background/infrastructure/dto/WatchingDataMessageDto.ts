export interface WatchingDataMessageDto {
	type: 'watching-data';
	payload: {
		days: number;
		average?: WatchingDataAveragePeriodicity;
	};
}

export type WatchingDataAveragePeriodicity = 'daily';
