import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';

export class TimeReportServicesRepository implements TimeReportServices {
	getTimeReport(): Promise<PeriodicalTimeReport> {
		return Promise.resolve({
			daily: { timeSpent: 3600 * 2 + 30 * 60 },
			weekly: { timeSpent: 3600 * 7 },
			monthly: { timeSpent: 3600 * 20 + 17 * 60 },
		});
	}
}
