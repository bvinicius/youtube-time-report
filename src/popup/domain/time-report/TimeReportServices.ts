import { PeriodicalTimeReport } from './TimeReportInfo';

export interface TimeReportServices {
	getTimeReport(days: number[]): Promise<PeriodicalTimeReport>;
}
