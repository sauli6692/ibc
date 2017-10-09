// Application hooks that run for every service
import { loggerHook } from './logger';

export const appHooks = {
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
