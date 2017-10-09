// Application hooks that run for every service
import { loggerHook } from './logger';
import { IServiceHooks } from '../core/domain/services/IServiceHooks';

export const appHooks: IServiceHooks = {
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
