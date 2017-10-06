import { BaseService } from '../../../core/domain/BaseService';
import { Role } from './role.model';

export class RoleService extends BaseService {
    protected define() {
        return {
            name: 'roles',
            model: Role
        };
    }
}
