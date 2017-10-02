// A hook that logs service method before, after and error
import logger from '../core/utils/logger';
import Hook from '../core/domain/Hook';

export default class LoggerHook implements Hook {
	set(): Function {
		return (hook: any) => {
			let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

			if (hook.type === 'error') {
				message += `: ${hook.error.message}`;
			}

			logger.info(message);
			logger.debug('hook.data', hook.data);
			logger.debug('hook.params', hook.params);

			if (hook.result) {
				logger.debug('hook.result', hook.result);
			}

			if (hook.error) {
				logger.error(hook.error);
			}
		};
	}
}
