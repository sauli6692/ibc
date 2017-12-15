const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToRoles } = require('feathers-authentication-hooks');

import { IServiceHooks } from '../../../core/domain/services/IService';
import { hashPassword } from '../../../core/utils/cryptography';

export const hooks: IServiceHooks = {
	before: {
	// 	all: [],
	// 	find: [authenticate('jwt')],
	// 	get: [],
		create: [hashPasswordHook],
		update: [hashPasswordHook],
		patch: [hashPasswordHook],
	// 	remove: []
	},

	after: {
		all: [
			commonHooks.when(
				(hook: any) => hook.params.provider,
				commonHooks.discard('password'),
				commonHooks.discard('salt')
			)
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};

function hashPasswordHook(hook: any) {
    return hashPassword(hook.data.password)
        .then((result: any) => {
            hook.data.password = result.password;
            hook.data.salt = result.salt;
            return Promise.resolve(hook);
        });
}
