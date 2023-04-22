import { afterEach, beforeEach, expect, suite, test, vi } from 'vitest';
import StatisticStorageReposisotyInstance from '../src/infrastructure/instances/StatisticsStorageRepositoryInstance';
import { StorageSystem } from '../src/infrastructure/repositories/StorageSystem';

vi.mock('chrome', () => ({
	storage: {
		local: {
			get: vi.fn((key, callback) => {
				const result = key === 'statistics' ? { statistics: {} } : {};
				callback(result);
			}),
			set: vi.fn(),
		},
	},
}));

const StatisticStorageReposisotyInstanceTest = suite(
	'StatisticStorageReposisotyInstance',
	() => {
		const storage: StorageSystem = {
			get: (key: string) => Promise.resolve(undefined),
			set: (key: string, value: any) => Promise.resolve(),
		};
		let repo: StatisticStorageReposisotyInstance;

		beforeEach(() => {
			repo = new StatisticStorageReposisotyInstance(storage);
			vi.spyOn(storage, 'get');
			vi.spyOn(storage, 'set');
		});

		afterEach(() => {
			vi.clearAllMocks();
		});

		test('getState should return the current state', async () => {
			expect(repo['state']).toEqual(undefined);
			const state = await repo.getState();
			expect(state).toEqual({});
			expect(storage.get).toHaveBeenCalledWith('statistics');
		});

		test('getState should return the cached state if available', async () => {
			repo['state'] = { '2022-01-01': { 'video-id': 100 } };
			const state = await repo.getState();
			expect(state).toEqual({ '2022-01-01': { 'video-id': 100 } });
			expect(storage.get).not.toHaveBeenCalled();
		});

		test('setState should update the state and save to storage', () => {
			const state = {
				'2022-01-01': { 'video-id': 100 },
				'2022-01-02': { 'video-id': 200 },
			};
			repo.setState(state);
			expect(repo['state']).toEqual(state);
			expect(storage.set).toHaveBeenCalledWith('statistics', state);
		});
	}
);

export default StatisticStorageReposisotyInstanceTest;
