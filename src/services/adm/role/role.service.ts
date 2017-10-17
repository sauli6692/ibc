import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Role } from './role.model';

export class RoleService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'roles',
            model: Role
        };
    }
}
