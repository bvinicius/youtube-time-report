import { afterEach, beforeEach, expect, suite, test, vi } from 'vitest';
import { StorageSystem } from '../../src/background/infrastructure/repositories/StorageSystem';
import { StatisticsServiceInstance } from '../../src/background/infrastructure/instances/StatisticsServiceInstance';
import { StatisticsService } from '../../src/background/infrastructure/services/StatisticsService';
import StatisticsRepositoryInstance from '../../src/background/infrastructure/instances/StatisticsRepositoryInstance';
import { StatisticsRepository } from '../../src/background/infrastructure/repositories/StatisticsReppository';

function setupService({ repository }: { repository: StatisticsRepository }) {
	return new StatisticsServiceInstance(repository);
}

const StatisticStorageReposisotyInstanceTest = suite(
	'StatisticStorageReposisotyInstance',
	() => {
		const storage: StorageSystem = {
			get: (key: string) => Promise.resolve(undefined),
			set: (key: string, value: any) => Promise.resolve(),
		};
		let service: StatisticsService;

		beforeEach(() => {
			service = setupService({
				repository: new StatisticsRepositoryInstance(storage),
			});
			vi.spyOn(storage, 'get');
			vi.spyOn(storage, 'set');
		});

		afterEach(() => {
			vi.clearAllMocks();
		});

		test('getTimeWatched should return the sum of all days', async () => {
			const state = {
				'2022-01-01': { 'video-id': 100 },
				'2022-01-02': { 'video-id': 200 },
			};
			const repository = new StatisticsRepositoryInstance(storage);
			repository.setState(state);
			service = setupService({ repository });

			vi.spyOn(global.Date, 'now').mockImplementationOnce(() =>
				new Date('2022-01-02').valueOf()
			);

			const result = await service.getTimeWatched({ days: 2 });
			expect(result).toBe(300);
		});

		test('getTimeWatched should ignore days with no data', async () => {
			const state = {
				'2022-01-01': { 'video-id': 100 },
				'2022-01-02': { 'video-id': 200 },
				'2022-01-05': { 'video-id': 100 },
			};
			const repository = new StatisticsRepositoryInstance(storage);
			repository.setState(state);
			service = setupService({ repository });

			vi.spyOn(global.Date, 'now').mockImplementationOnce(() =>
				new Date('2022-01-06').valueOf()
			);

			const result = await service.getTimeWatched({ days: 5 });
			expect(result).toBe(400);
		});

		test('getAverageWatchingData should return the average', async () => {
			const state = {
				'2022-01-01': { 'video-id': 100 },
				'2022-01-02': { 'video-id': 200 },
				'2022-01-05': { 'video-id': 100 },
			};
			const repository = new StatisticsRepositoryInstance(storage);
			repository.setState(state);
			service = setupService({ repository });

			vi.spyOn(global.Date, 'now').mockImplementationOnce(() =>
				new Date('2022-01-06').valueOf()
			);

			const result = await service.getAverageWatchingData('daily', 5);
			expect(result).toBe(400 / 5);
		});
	}
);

export default StatisticStorageReposisotyInstanceTest;
