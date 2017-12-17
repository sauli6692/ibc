import component from './component';
import service from './service';
import componentService from './componentService';
import role from './role';
import roleComponent from './roleComponent';
import user from './user';
import userRole from './userRole';

export const adm: any = {
    Component: {
        seed: component
    },
    Role: {
        seed: role
    },
    Service: {
        seed: service
    },
    User: {
        seed: user,
        dependencies: [{
            component: 'pmm',
            model: 'Member'
        }]
    },
    ComponentService: {
        seed: componentService,
        dependencies: [{
            model: 'Component'
        }, {
            model: 'Service'
        }]
    },
    RoleComponent: {
        seed: roleComponent,
        dependencies: [{
            model: 'Component'
        }, {
            model: 'Role'
        }]
    },
    UserRole: {
        seed: userRole,
        dependencies: [{
            model: 'User'
        }, {
            model: 'Role'
        }]
    }
};
