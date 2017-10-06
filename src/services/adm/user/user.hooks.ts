const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
	authenticate('jwt'),
	restrictToOwner({
		idField: 'id',
		ownerField: 'id'
	})
];

export const hooks = {
	before: {
		all: new Array(),
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
		find: new Array(),
		get: new Array(),
		create: new Array(),
		update: new Array(),
		patch: new Array(),
		remove: new Array()
	},

	error: {
		all: new Array(),
		find: new Array(),
		get: new Array(),
		create: new Array(),
		update: new Array(),
		patch: new Array(),
		remove: new Array()
	}
};
