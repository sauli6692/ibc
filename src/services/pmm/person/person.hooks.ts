import * as _ from 'lodash';
import { IServiceHooks } from '../../../core/domain/services';

let includeJoins = (hook: any) => {
    if (!_.isNil(hook.params.query) && hook.params.query.fullDetails) {
        delete hook.params.query.fullDetails;
        hook.params.sequelize = {
            include: [{
                model: hook.app.getModel('IntegrationLevel'),
                as: 'personIntegrationLevel'
            }, {
                model: hook.app.getModel('Occupation'),
                as: 'personOccupation'
            }, {
                model: hook.app.getModel('CivilStatus'),
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
