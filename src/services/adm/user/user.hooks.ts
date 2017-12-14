const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

import { IServiceHooks } from '../../../core/domain/services/IService';
import { hashPassword } from '../../../core/utils/cryptography';

const restrict: any = [
	authenticate('jwt'),
	// restrictToOwner({
	// 	idField: 'id',
	// 	ownerField: 'id'
	// })
];

export const hooks: IServiceHooks = {
	before: {
		all: [],
		find: [authenticate('jwt')],
		get: [...restrict],
		create: [...restrict, hashPasswordHook],
		update: [...restrict, hashPasswordHook],
		patch: [...restrict, hashPasswordHook],
		remove: [...restrict]
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
