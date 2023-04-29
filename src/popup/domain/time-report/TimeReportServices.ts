import { TimeReportQuery } from '../../secondary/time-report/TimeReportDtos';
import { PeriodicalTimeReport } from './TimeReportInfo';

export interface TimeReportServices {
    getTimeReport(query: TimeReportQuery): Promise<PeriodicalTimeReport>;
}
