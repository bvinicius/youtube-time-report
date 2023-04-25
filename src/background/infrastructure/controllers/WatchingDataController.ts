import {
	WatchingDataAveragePeriodicity,
	WatchingDataMessageDto,
} from '../dto/WatchingDataMessageDto';
import { StatisticsService } from '../services/StatisticsService';

export class WatchingDataController {
	constructor(
		private receiver: typeof chrome.runtime,
		private statisticStorage: StatisticsService
	) {}

	listen() {
		this.receiver.onMessage.addListener(
			(message: WatchingDataMessageDto, _, sendResponse) => {
				switch (message.type) {
					case 'watching-data':
						if (message.payload.average) {
							this.getAverageWatchingData(
								message.payload.average,
								message.payload.days
							).then(sendResponse);
						} else {
							this.getWatchingData(message.payload.days).then(
								sendResponse
							);
						}
						break;
				}
				return true;
			}
		);
	}

	private getWatchingData(days: number) {
		console.log('getWatchingData', days);

		return this.statisticStorage.getTimeWatched({ days });
	}

	private getAverageWatchingData(
		periodicity: WatchingDataAveragePeriodicity,
		count: number
	) {
		console.log('get average', count);
		return this.statisticStorage.getAverageWatchingData(periodicity, count);
	}
}
