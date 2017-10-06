// Application hooks that run for every service
import { loggerHook } from './hooks/logger';

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
		all: [loggerHook],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [loggerHook],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
