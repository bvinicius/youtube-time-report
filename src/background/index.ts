import {
	ContentVideoCounterMessage,
	ContentYoutubeVideo,
} from './secondary/ContentVideoCounterMessage';
import StatisticsStorageServiceImpl from './secondary/StatisticsStorageServiceImpl';
import VideoCounter from './secondary/VideoCounter';

const statisticsService = new StatisticsStorageServiceImpl();

const videoCounter = new VideoCounter(statisticsService);

chrome.runtime.onMessage.addListener((message: ContentVideoCounterMessage) => {
	switch (message.type) {
		case 'enableCounter':
			onEnableCounter(message.payload);
			break;
		case 'disableCounter':
			onDisableCounter();
			break;
	}
});

function onEnableCounter(payload: ContentYoutubeVideo) {
	videoCounter.enableCounter(payload);
}

function onDisableCounter() {
	videoCounter.disableCounter();
}
