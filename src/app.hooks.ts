// Application hooks that run for every service
import LoggerHook from './hooks/logger';

const loggerHook = new LoggerHook();

export default {
	before: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [loggerHook.set()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [loggerHook.set()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
