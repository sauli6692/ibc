import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { User } from './user.model';
import { hooks } from './user.hooks';
import { filters } from './user.filters';

export class UserService extends BaseCRUDService {
    protected define() {
        return {
            name: 'users',
            model: User
        };
    }

    protected defineHooks() {
        return hooks;
    }

    protected defineFilters() {
        return filters;
    }
}
