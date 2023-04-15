import { App, inject } from 'vue';
import { TimeReportServicesRepository } from '../../secondary/time-report/TimeReportServicesRepository';
import { TIME_REPORT_SERVICES } from './dependency-symbols';

const provideServices = (app: App): void => {
	app.provide(TIME_REPORT_SERVICES, new TimeReportServicesRepository());
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
