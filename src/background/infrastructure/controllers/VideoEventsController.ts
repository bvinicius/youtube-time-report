import { VideoCounterMessageDto } from '../dto/VideoCounterMessageDto';

interface CounterCallbacks {
    onEnabled: (videoId: string) => void;
    onDisabled: () => void;
}

export class VideoEventsController {
    constructor(private receiver: typeof chrome.runtime) {}

    listen(callbacks: CounterCallbacks) {
        this.receiver.onMessage.addListener(
            (message: VideoCounterMessageDto) => {
                switch (message.type) {
                    case 'enableCounter':
                        callbacks.onEnabled(message.payload.videoId);
                        break;
                    case 'disableCounter':
                        callbacks.onDisabled();
                        break;
                }
            }
        );
    }
}
