import { VideoEventsController } from './infrastructure/controllers/VideoEventsController';
import StatisticStorageReposisotyInstance from './infrastructure/instances/StatisticsStorageRepositoryInstance';
import VideoTimeCounter from './domain/VideoTimeCounter';
import { WatchingDataController } from './infrastructure/controllers/WatchingDataController';

const statisticStorageRepository = new StatisticStorageReposisotyInstance();
const videoCounter = new VideoTimeCounter(statisticStorageRepository);

new VideoEventsController(chrome.runtime).listen({
	onEnabled: videoCounter.enableCounter.bind(videoCounter),
	onDisabled: videoCounter.disableCounter.bind(videoCounter),
});

new WatchingDataController(chrome.runtime, statisticStorageRepository).listen();
