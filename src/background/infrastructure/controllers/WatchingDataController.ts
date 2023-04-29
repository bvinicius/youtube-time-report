import {
	WatchingDataAveragePeriodicity,
	WatchingDataMessageDto,
} from '../dto/WatchingDataMessageDto';
import { YTRLogger } from '../logger/YTRLogger';
import { StatisticsService } from '../services/StatisticsService';

export class WatchingDataController {
	constructor(
		private receiver: typeof chrome.runtime,
		private statisticStorage: StatisticsService,
		private logger: YTRLogger
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
		this.logger.log('getWatchingData', days);

		return this.statisticStorage.getTimeWatched({ days });
	}

	private getAverageWatchingData(
		periodicity: WatchingDataAveragePeriodicity,
		count: number
	) {
		this.logger.log('get average', count);
		return this.statisticStorage.getAverageWatchingData(periodicity, count);
	}
}
