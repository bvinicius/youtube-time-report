import { WatchingDataMessageDto } from '../dto/WatchingDataMessageDto';
import { StatisticStorageService } from '../services/StatisticStorageService';

export class WatchingDataController {
	constructor(
		private receiver: typeof chrome.runtime,
		private statisticRepository: StatisticStorageService
	) {}

	listen() {
		this.receiver.onMessage.addListener(
			(message: WatchingDataMessageDto, _, sendResponse) => {
				switch (message.type) {
					case 'watching-data':
						this.getWatchingData(message.payload.days).then(
							sendResponse
						);
						break;
				}
				return true;
			}
		);
	}

	private getWatchingData(days: number) {
		return this.statisticRepository.getTimeWatched({ days });
	}
}
