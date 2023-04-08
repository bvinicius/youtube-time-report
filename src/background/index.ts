import {
	ContentVideoCounterMessage,
	ContentYoutubeVideo,
} from './secondary/ContentVideoCounterMessage';

chrome.runtime.onMessage.addListener((message: ContentVideoCounterMessage) => {
	switch (message.type) {
		case 'enableCounter':
			onEnableCounter(message.payload);
			break;
		case 'disableCounter':
			onDisableCounter(message.payload);
			break;
	}
});

function onEnableCounter(payload: ContentYoutubeVideo) {
	console.log('onEnableCounter');
}

function onDisableCounter(payload: ContentYoutubeVideo) {
	console.log('onDisableCounter');
}
