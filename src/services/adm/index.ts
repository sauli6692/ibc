import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { ComponentService } from './component/component.service';
import { ModelService } from './model/model.service';
import { ComponentModelService } from './componentModel/componentModel.service';
import { RoleComponentService } from './roleComponent/roleComponent.service';
import { ComponentRoleService } from './roleComponent/componentRole.service';
import { UserRoleService } from './userRole/userRole.service';

export const adm = {
    name: 'adm',
    services: {
        role: RoleService,
        user: UserService,
        component: ComponentService,
        model: ModelService,
        componentModel: ComponentModelService,
        roleComponent: RoleComponentService,
        componentRole: ComponentRoleService,
        userRole: UserRoleService
    }
};
