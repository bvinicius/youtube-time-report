import { StorageSystem } from '../repositories/StorageSystem';

export class StorageSystemInstance implements StorageSystem {
    get<T = unknown>(key: string): Promise<T | undefined> {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, (result) => {
                resolve(result[key]);
            });
        });
    }
    set<T = unknown>(key: string, value: T): Promise<void> {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, () => {
                resolve();
            });
        });
    }
}
