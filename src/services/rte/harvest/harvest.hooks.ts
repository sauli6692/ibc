import * as _ from 'lodash';

import { IServiceHooks } from '../../../core/domain/services';

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

export const hooks: IServiceHooks = {
	before: {
        find: [includePersonInformation],
        get: [includePersonInformation]
    }
};
