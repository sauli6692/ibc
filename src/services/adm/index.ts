import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';

export const adm = {
    name: 'adm',
    services: {
        role: RoleService,
        user: UserService
    }
};
