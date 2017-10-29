import * as lodash from 'lodash';

import { IServiceHooks, IHook } from '../../../core/domain/services';

let hook: IHook = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};

let before = lodash.cloneDeep(hook);
let after = lodash.cloneDeep(hook);
let error = lodash.cloneDeep(hook);

let includePersonInformation = (hook: any) => {
    hook.params.sequelize = {
        attributes: [['person_id', 'id']],
        include: [{
            model: hook.app.getModel('Person'),
            as: 'information',
            attributes: { exclude: ['id'] }
        }],
		raw: false
    };
};

before.find.push(includePersonInformation);
before.get.push(includePersonInformation);

export const hooks: IServiceHooks = {
	before,
	after,
	error
};
