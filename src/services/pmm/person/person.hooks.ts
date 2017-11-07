import { IServiceHooks } from '../../../core/domain/services';

let includeJoins = (hook: any) => {
    if (hook.params.query.fullDetails) {
        delete hook.params.query.fullDetails;
        hook.params.sequelize = {
            include: [{
                model: hook.app.getModel('IntegrationLevel'),
                as: 'personIntegrationLevel',
                attributes: { exclude: ['id'] }
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
