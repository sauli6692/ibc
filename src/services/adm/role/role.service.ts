import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Role } from './role.model';

export class RoleService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'roles',
            model: Role
        };
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
