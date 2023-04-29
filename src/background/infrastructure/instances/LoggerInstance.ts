import { YTRLogger } from '../../../shared/logger/YTRLogger';

export class LoggerInstance implements YTRLogger {
	log = this.checkEnvironmentBeforeAction(console.log);
	error = this.checkEnvironmentBeforeAction(console.error);
	warn = this.checkEnvironmentBeforeAction(console.warn);
	info = this.checkEnvironmentBeforeAction(console.info);

	private checkEnvironmentBeforeAction(fn: (...args: any[]) => void) {
		const isProduction = import.meta.env.PROD;
		return isProduction ? () => {} : fn.bind(console);
	}
}
