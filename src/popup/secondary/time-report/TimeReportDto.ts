import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';

export type TimeReportDto = Record<string, number>;

export const toPeriodicalTimeReport = (
	timeReportDto: TimeReportDto
): PeriodicalTimeReport => ({
	daily: { timeSpent: timeReportDto['1'] },
	weekly: { timeSpent: timeReportDto['7'] },
	monthly: { timeSpent: timeReportDto['30'] },
});
