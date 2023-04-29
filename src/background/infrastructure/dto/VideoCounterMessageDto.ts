export interface VideoCounterMessageDto {
    type: 'enableCounter' | 'disableCounter';
    payload: { videoId: string };
}
