import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';

export class TimeReportServicesRepository implements TimeReportServices {
	getTimeReport(): Promise<PeriodicalTimeReport> {
		throw new Error('Method not implemented.');
	}
}
