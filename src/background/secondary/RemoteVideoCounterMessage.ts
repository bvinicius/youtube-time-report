export interface RemoteVideoCounterMessage {
	type: 'enableCounter' | 'disableCounter';
	payload: { videoId: string };
}
