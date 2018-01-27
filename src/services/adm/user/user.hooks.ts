const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToRoles } = require('feathers-authentication-hooks');

import { IServiceHooks } from '../../../core/domain/services/IService';
import { hashPassword } from '../../../core/utils/cryptography';

let includePersonInformation = (hook: any) => {
	let exclude = ['memberId'];
	if (hook.method === 'find') {
		exclude.push('salt');
		exclude.push('password');
	}

    hook.params.sequelize = {
        attributes: { exclude },
        include: [{
            model: hook.app.getModel('pmm', 'Member'),
            as: 'owner',
            attributes: [['person_id', 'id']],
            include: [{
                model: hook.app.getModel('pmm', 'Person'),
                as: 'information',
                attributes: [ 'firstname', 'lastname']
            }]
        }],
		raw: false
    };
};

export const hooks: IServiceHooks = {
	before: {
		get: [(hook: any) => {
            hook.service.id = isNaN(hook.id) ? 'username' : 'id';
        }, includePersonInformation],
		find: [includePersonInformation],
		create: [hashPasswordHook],
		update: [hashPasswordHook],
		patch: [hashPasswordHook]
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
