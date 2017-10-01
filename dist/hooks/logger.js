"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
class LoggerHook {
    set() {
        return (hook) => {
            let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;
            if (hook.type === 'error') {
                message += `: ${hook.error.message}`;
            }
            logger_1.default.info(message);
            logger_1.default.debug('hook.data', hook.data);
            logger_1.default.debug('hook.params', hook.params);
            if (hook.result) {
                logger_1.default.debug('hook.result', hook.result);
            }
            if (hook.error) {
                logger_1.default.error(hook.error);
            }
        };
    }
}
exports.default = LoggerHook;
