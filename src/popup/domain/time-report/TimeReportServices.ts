import { PeriodicalTimeReport } from './TimeReportInfo';

export interface TimeReportServices {
	getTimeReport(): Promise<PeriodicalTimeReport>;
}
