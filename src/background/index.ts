import { VideoCounterMessageDto } from './infrastructure/dto/VideoCounterMessageDto';
import StatisticStorageReposisotyInstance from './infrastructure/instances/StatisticsStorageRepositoryInstance';
import VideoTimeCounter from './domain/VideoTimeCounter';

const statisticsService = new StatisticStorageReposisotyInstance();
const videoCounter = new VideoTimeCounter(statisticsService);

chrome.runtime.onMessage.addListener((message: VideoCounterMessageDto) => {
	switch (message.type) {
		case 'enableCounter':
			onEnableCounter(message.payload.videoId);
			break;
		case 'disableCounter':
			onDisableCounter();
			break;
	}
});

function onEnableCounter(videoId: string) {
	videoCounter.enableCounter(videoId);
}

function onDisableCounter() {
	videoCounter.disableCounter();
}
