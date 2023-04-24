import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';
import {
	TimeReportDto,
	TimeReportQuery,
	toPeriodicalTimeReport,
} from './TimeReportDtos';

export class TimeReportServicesRepository implements TimeReportServices {
	getTimeReport(query: TimeReportQuery): Promise<PeriodicalTimeReport> {
		const { absolutes, averages } = query;

		return new Promise((resolve) => {
			const absPromises = absolutes.map((day) =>
				this.getTimeWatched(day).then((result) => ({
					[day]: result,
				}))
			);
			const avgPromises = averages.map((day) =>
				this.getAverageTimeWatched(day).then((result) => ({
					1: result,
				}))
			);

			Promise.all([...absPromises, ...avgPromises]).then((results) => {
				const result: TimeReportDto = {};
				Object.values(results).forEach((obj) => {
					Object.assign(result, obj);
				});
				resolve(toPeriodicalTimeReport(result));
			});
		});
	}

	private getTimeWatched(days: number): Promise<number> {
		return new Promise((resolve) => {
			chrome.runtime.sendMessage(
				{ type: 'watching-data', payload: { days } },
				(response) => {
					console.log('resolved absolute time watched', response);
					resolve(response);
				}
			);
		});
	}

	private getAverageTimeWatched(days: number): Promise<number> {
		return new Promise((resolve) => {
			chrome.runtime.sendMessage(
				{
					type: 'watching-data',
					payload: { days, average: 'daily' },
				},
				(response) => {
					console.log('resolved average time watched', response);
					resolve(response);
				}
			);
		});
	}
}
