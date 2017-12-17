import * as _ from 'lodash';
import { IServiceHooks } from '../../../core/domain/services';

let includeJoins = (hook: any) => {
    if (!_.isNil(hook.params.query) && hook.params.query.fullDetails) {
        delete hook.params.query.fullDetails;
        hook.params.sequelize = {
            include: [{
                model: hook.app.getModel('pmm', 'IntegrationLevel'),
                as: 'personIntegrationLevel'
            }, {
                model: hook.app.getModel('pmm', 'Occupation'),
                as: 'personOccupation'
            }, {
                model: hook.app.getModel('pmm', 'CivilStatus'),
                as: 'personCivilStatus'
            }],
    		raw: false
        };
    }
};

export const hooks: IServiceHooks = {
	before: {
        find: [includeJoins],
        get: [includeJoins]
    }
};
