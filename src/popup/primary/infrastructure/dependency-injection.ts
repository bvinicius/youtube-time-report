import { App } from 'vue';
import { TimeReportServicesRepository } from '../../secondary/time-report/TimeReportServicesRepository';
import { TIME_REPORT_SERVICES } from './dependency-symbols';

const provideServices = (app: App): void => {
	app.provide(TIME_REPORT_SERVICES, new TimeReportServicesRepository());
};

export const provide = (app: App): void => {
	provideServices(app);
};
