import { RemoteVideoCounterMessage } from './secondary/RemoteVideoCounterMessage';
import StatisticsStorageServiceImpl from './secondary/StatisticsStorageServiceImpl';
import VideoTimeCounter from './secondary/VideoTimeCounter';

const statisticsService = new StatisticsStorageServiceImpl();
const videoCounter = new VideoTimeCounter(statisticsService);

chrome.runtime.onMessage.addListener((message: RemoteVideoCounterMessage) => {
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
