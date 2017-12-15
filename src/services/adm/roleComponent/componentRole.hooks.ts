import { IServiceHooks } from '../../../core/domain/services/IService';


export const hooks: IServiceHooks = {
	before: {
		all: [(hook: any) => {
            hook.params.property = isNaN(hook.params.componentId) ? 'name' : 'id';

			return Promise.resolve(hook);
        }]
	}
};
