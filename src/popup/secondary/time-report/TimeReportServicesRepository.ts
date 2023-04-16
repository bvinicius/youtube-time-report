import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';
import { TimeReportDto, toPeriodicalTimeReport } from './TimeReportDto';

export class TimeReportServicesRepository implements TimeReportServices {
	getTimeReport(days: number[]): Promise<PeriodicalTimeReport> {
		return new Promise((resolve) => {
			Promise.all(days.map((day) => this.getTimeWatched(day))).then(
				(results) => {
					const result: TimeReportDto = {};
					results.forEach((res, index) => {
						Object.assign(result, { [days[index]]: res });
					});
					resolve(toPeriodicalTimeReport(result));
				}
			);
		});
	}

	private getTimeWatched(days: number): Promise<number> {
		return new Promise((resolve) => {
			chrome.runtime.sendMessage(
				{ type: 'watching-data', payload: { days } },
				(response) => {
					resolve(response);
				}
			);
		});
	}
}
