import { VideoEventsController } from './infrastructure/controllers/VideoEventsController';
import StatisticStorageReposisotyInstance from './infrastructure/instances/StatisticsRepositoryInstance';
import VideoTimeCounter from './domain/VideoTimeCounter';
import { WatchingDataController } from './infrastructure/controllers/WatchingDataController';
import { StatisticsServiceInstance } from './infrastructure/instances/StatisticsServiceInstance';
import { StorageSystemInstance } from './infrastructure/instances/StorageSystemInstance';
import { LoggerInstance } from './infrastructure/instances/LoggerInstance';

const logger = new LoggerInstance();
const statisticStorageRepository = new StatisticStorageReposisotyInstance(
	new StorageSystemInstance()
);
const statisticStorageService = new StatisticsServiceInstance(
	statisticStorageRepository
);

const videoCounter = new VideoTimeCounter(statisticStorageService);

new VideoEventsController(chrome.runtime).listen({
	onEnabled: videoCounter.enableCounter.bind(videoCounter),
	onDisabled: videoCounter.disableCounter.bind(videoCounter),
});

new WatchingDataController(
	chrome.runtime,
	statisticStorageService,
	logger
).listen();
