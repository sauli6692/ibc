import BaseService from '../../../core/domain/BaseService';
import Role from './role.model';

export default class RoleService extends BaseService {
    protected define() {
        return {
            name: 'role',
            model: Role
        };
    }
}
