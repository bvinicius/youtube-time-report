export interface ContentVideoCounterMessage {
	type: 'enableCounter' | 'disableCounter';
	payload: ContentYoutubeVideo;
}

export interface ContentYoutubeVideo {
	channel: string;
	id: string;
	tags: string[];
	title: string;
}
