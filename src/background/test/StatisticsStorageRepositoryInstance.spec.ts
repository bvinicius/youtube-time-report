import { afterEach, beforeEach, expect, suite, test, vi } from 'vitest';
import StatisticStorageReposisotyInstance from '../src/infrastructure/instances/StatisticsStorageRepositoryInstance';

// Mock da função chrome.storage.local.get
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
		let repo: StatisticStorageReposisotyInstance;

		beforeEach(() => {
			repo = new StatisticStorageReposisotyInstance();
		});

		afterEach(() => {
			vi.clearAllMocks();
		});

		test('getState should return the current state', async () => {
			const state = await repo.getState();
			expect(state).toEqual({});
			expect(chrome.storage.local.get).toHaveBeenCalledWith(
				'statistics',
				expect.any(Function)
			);
		});

		test('getState should return the cached state if available', async () => {
			repo['state'] = { '2022-01-01': { 'video-id': 100 } };
			const state = await repo.getState();
			expect(state).toEqual({ '2022-01-01': { 'video-id': 100 } });
			expect(chrome.storage.local.get).not.toHaveBeenCalled();
		});

		test('setState should update the state and save to storage', async () => {
			const state = {
				'2022-01-01': { 'video-id': 100 },
				'2022-01-02': { 'video-id': 200 },
			};
			await repo.setState(state);
			expect(repo['state']).toEqual(state);
			expect(chrome.storage.local.set).toHaveBeenCalledWith({
				statistics: state,
			});
		});
	}
);

export default StatisticStorageReposisotyInstanceTest;
