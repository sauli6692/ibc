import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { ComponentService } from './component/component.service';
import { ServiceService } from './service/service.service';
import { ComponentServiceService } from './componentService/componentService.service';
import { RoleComponentService } from './roleComponent/roleComponent.service';
import { ComponentRoleService } from './roleComponent/componentRole.service';
import { UserRoleService } from './userRole/userRole.service';

export const adm = {
    name: 'adm',
    services: {
        role: RoleService,
        user: UserService,
        component: ComponentService,
        service: ServiceService,
        componentService: ComponentServiceService,
        roleComponent: RoleComponentService,
        componentRole: ComponentRoleService,
        userRole: UserRoleService
    }
};
