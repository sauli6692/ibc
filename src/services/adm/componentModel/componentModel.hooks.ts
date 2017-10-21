import * as lodash from 'lodash';
import * as errors from 'feathers-errors';

import { IServiceHooks, IHook } from '../../../core/domain/services/IService';

let hook: IHook = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};

let beforeHook: IHook = lodash.cloneDeep(hook);

export const hooks: IServiceHooks = {
	before: beforeHook,
	after: hook,
	error: hook
};
