import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Role } from './role.model';

export class RoleService extends BaseCRUDService {
    protected define() {
        return {
            name: 'roles',
            model: Role
        };
    }
}
