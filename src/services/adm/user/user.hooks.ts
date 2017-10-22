const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;

import { IServiceHooks } from '../../../core/domain/services/IService';
const restrict = [
	authenticate('jwt'),
	restrictToOwner({
		idField: 'id',
		ownerField: 'id'
	})
];

export const hooks: IServiceHooks = {
	before: {
		all: [],
		find: [authenticate('jwt')],
		get: [...restrict],
		create: [hashPassword()],
		update: [...restrict, hashPassword()],
		patch: [...restrict, hashPassword()],
		remove: [...restrict]
	},

	after: {
		all: [
			commonHooks.when(
				(hook: any) => hook.params.provider,
				commonHooks.discard('password')
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
