import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

import { IServiceHooks, IHook } from '../IService';

const privilegeMethodsMap = {
    create: 'C',
    find: 'R',
    get: 'R',
    update: 'U',
    patch: 'U',
    remove: 'D'
};

export const authenticationHooks = (component: string, service: string, beforeHooks: IHook): void => {
    let restrict = [
        addPrivilegesHook(component, service),
        addComponentRolesHook(component),
        authenticate('jwt'),
        setLoggedUser,
        restrictToRolesHook
    ];

    beforeHooks.all = _.concat(beforeHooks.all, restrict);
};

function addPrivilegesHook(component: string, service: string) {
    return (hook: any) => {
        return getServicePrivileges(hook.app, component, service)
            .then((privileges: any) => {
                hook.params.privileges = _.toUpper(privileges);
                return hook;
            });
    };
}

function getServicePrivileges(app: any, component: string, service: string) {
    return app.service('adm/components/:componentId/services')
        .get(service, { componentId: component })
        .then((componentModel: any) => componentModel.privileges)
        .catch(() => {
            throw Forbidden();
        });
}

function addComponentRolesHook(component: string) {
    return (hook: any) => {
        let privilege = privilegeMethodsMap[hook.method];
        if (_.indexOf(hook.params.privileges, privilege) === -1) {
            throw Forbidden();
        }

        return getComponentRoles(hook.app, component)
            .then((roles: any) => {
                hook.params.componentRoles = roles;
                return hook;
            });
    };
}

function getComponentRoles(app: any, component: string) {
    return app.service('adm/components/:componentId/roles')
        .find({ componentId: component })
        .then((roles: any) => _.map(roles, (role: any) => role.id))
        .catch((): any => []);
}

function setLoggedUser(hook: any) {
    if (hook.params.payload) {
        hook.params.user = {
            id: hook.params.payload.id,
            memberId: hook.params.payload.memberId,
            roles: hook.params.payload.roles
        };
    }
    return Promise.resolve(hook);
}

function restrictToRolesHook(hook: any) {
    if (_.isEmpty(hook.params.componentRoles)) {
        return Promise.resolve(hook);
    }

    return restrictToRoles({
        roles: hook.params.componentRoles,
        idField: 'id'
    })(hook);
}

function Forbidden() {
    return new Errors.Forbidden('You do not have the permissions to access this.');
}
