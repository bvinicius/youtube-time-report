import { WatchingDataMessageDto } from '../dto/WatchingDataMessageDto';
import { StatisticStorageRepository } from '../repositories/StatisticStorageRepository';

export class WatchingDataController {
	constructor(
		private receiver: typeof chrome.runtime,
		private statisticRepository: StatisticStorageRepository
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
		return this.statisticRepository.getState({ days });
	}
}
