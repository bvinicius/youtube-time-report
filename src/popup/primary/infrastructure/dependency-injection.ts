import { App, inject } from 'vue';
import { TimeReportServicesRepository } from '../../secondary/time-report/TimeReportServicesRepository';
import { LOGGER, TIME_REPORT_SERVICES } from './dependency-symbols';
import { YTRLogger } from '../../../shared/logger/YTRLogger';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';
import { LoggerInstance } from '../../secondary/logger/LoggerInstance';

const provideServices = (app: App): void => {
	const loggerInstance = new LoggerInstance();
	app.provide<TimeReportServices>(
		TIME_REPORT_SERVICES,
		new TimeReportServicesRepository(loggerInstance)
	);
	app.provide<YTRLogger>(LOGGER, loggerInstance);
};

export const injectSafe = <T>(dependency: symbol): T => {
	const service = inject<T>(dependency);
	if (!service) {
		throw new Error(`Service ${dependency.toString()} not found`);
	}
	return service;
};

export const provide = (app: App): void => {
	provideServices(app);
};
