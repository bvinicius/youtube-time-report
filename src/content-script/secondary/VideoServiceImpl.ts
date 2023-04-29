import { VideoService } from '../domain/VideoService';

export default class VideoServiceImpl implements VideoService {
    getVideoId(): string | null {
        return new URLSearchParams(location.search).get('v');
    }
    getVideoHTMLElement(): HTMLVideoElement | null {
        if (!location.href.includes('watch?v=')) {
            return null;
        }
        return document.querySelector('video');
    }
}
