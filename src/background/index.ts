import { RemoteVideoCounterMessage } from './secondary/RemoteVideoCounterMessage';
import StatisticsStorageServiceImpl from './secondary/StatisticsStorageServiceImpl';
import WindowAndTabActionsObserver from './secondary/WindowAndTabActionsObserver';
import VideoTimeCounter from './secondary/VideoTimeCounter';

const statisticsService = new StatisticsStorageServiceImpl();
const videoCounter = new VideoTimeCounter(statisticsService);

chrome.runtime.onMessage.addListener((message: RemoteVideoCounterMessage) => {
	initializeTabObserver(message.payload.videoId);

	switch (message.type) {
		case 'enableCounter':
			onEnableCounter(message.payload.videoId);
			break;
		case 'disableCounter':
			onDisableCounter();
			break;
	}
});

function initializeTabObserver(videoId: string) {
	const tabActionObserver = new WindowAndTabActionsObserver({
		onTabFocus: onEnableCounter,
		onTabBlur: onDisableCounter,
		onWindowFocus: onEnableCounter,
		onWindowBlur: onDisableCounter,
		tabFilterCallback: (tab) => tab.url?.includes(videoId) || false,
	});

	tabActionObserver.observe();
}

function onEnableCounter(videoId?: string) {
	videoCounter.enableCounter(videoId);
}

function onDisableCounter() {
	videoCounter.disableCounter();
}
