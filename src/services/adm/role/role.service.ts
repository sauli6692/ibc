import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Role } from './role.model';
import { schemas } from './role.schema';

export class RoleService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'roles',
            model: Role,
            schemas
        };
    }
}
