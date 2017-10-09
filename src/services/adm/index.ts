import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { ComponentService } from './component/component.service';
import { ModelService } from './model/model.service';

export const adm = {
    name: 'adm',
    services: {
        role: RoleService,
        user: UserService,
        component: ComponentService,
        model: ModelService
    }
};
