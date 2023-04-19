import { VideoEventsController } from './infrastructure/controllers/VideoEventsController';
import StatisticStorageReposisotyInstance from './infrastructure/instances/StatisticsStorageRepositoryInstance';
import VideoTimeCounter from './domain/VideoTimeCounter';
import { WatchingDataController } from './infrastructure/controllers/WatchingDataController';
import { StatisticStorageServiceInstance } from './infrastructure/instances/StatisticStorageServiceInstance';

const statisticStorageRepository = new StatisticStorageReposisotyInstance();
const statisticStorageService = new StatisticStorageServiceInstance(
	statisticStorageRepository
);

const videoCounter = new VideoTimeCounter(statisticStorageService);

new VideoEventsController(chrome.runtime).listen({
	onEnabled: videoCounter.enableCounter.bind(videoCounter),
	onDisabled: videoCounter.disableCounter.bind(videoCounter),
});

new WatchingDataController(chrome.runtime, statisticStorageService).listen();
