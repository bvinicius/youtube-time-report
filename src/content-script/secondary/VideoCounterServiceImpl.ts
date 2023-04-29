import { VideoCounterService } from '../domain/VideoCounterService';

export interface VideoCounterMessage {
    type: 'enableCounter' | 'disableCounter';
    payload: { videoId: string };
}

export default class VideoCounterServiceImpl implements VideoCounterService {
    enableCounter(videoId: string): void {
        chrome.runtime.sendMessage<VideoCounterMessage>({
            type: 'enableCounter',
            payload: { videoId }
        });
    }

    disableCounter(): void {
        chrome.runtime.sendMessage<Pick<VideoCounterMessage, 'type'>>({
            type: 'disableCounter'
        });
    }
}
