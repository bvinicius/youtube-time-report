import { StorageSystem } from '../repositories/StorageSystem';

export class StorageSystemInstance implements StorageSystem {
    get<T = any>(key: string): Promise<T | undefined> {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, (result) => {
                resolve(result[key]);
            });
        });
    }
    set<T = any>(key: string, value: T): Promise<void> {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [key]: value }, () => {
                resolve();
            });
        });
    }
}
