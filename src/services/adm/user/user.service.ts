import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { User } from './user.model';
import { hooks } from './user.hooks';
import { filters } from './user.filters';

export class UserService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'users',
            // hooks: hooks,
            model: User
        };
    }

    // protected defineHooks() {
    //     return hooks;
    // }

    protected defineFilters() {
        return filters;
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
