import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { User } from './user.model';
import { hooks } from './user.hooks';
import { filters } from './user.filters';
import { schemas } from './user.schema';

export class UserService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'users',
            // hooks: hooks,
            filters,
            model: User,
            schemas
        };
    }
}
