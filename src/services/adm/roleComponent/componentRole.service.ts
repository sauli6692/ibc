import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { RoleComponent } from './roleComponent.model';
import { schemas } from './componentRole.schema';
import { hooks } from './componentRole.hooks';

export class ComponentRoleService extends BaseCustomService implements IService {
    private RoleComponent: any;
    private Component: any;
    private Role: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new RoleComponent(this.component, this.app);
        this.RoleComponent = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Component = this.app.getModel('Component');
        this.Role = this.app.getModel('Role');
    }

    protected define() {
        return {
            route: 'components/:componentId/roles',
            schemas,
            hooks,
            authenticate: false
        };
    }

    public find(params: any): Promise<any> {
        return this.Component.findAll({
            where: { [params.property]: params.componentId },
            include: [{
                model: this.Role,
                as: 'roles'
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Component not found.');
            }
            return lodash.map(results[0].roles, (role: any) => {
                return {
                    id: role.id,
                    name: role.name,
                    description: role.description
                };
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Component.findAll({
            where: { [params.property]: params.componentId },
            include: [{
                model: this.Role,
                as: 'roles',
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }

            let role = results[0].roles[0];
            return {
                id: role.id,
                name: role.name,
                description: role.description
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.componentId = lodash.parseInt(params.componentId);

        return this.RoleComponent.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            [params.property]: params.componentId
        };

        if (!lodash.isNil(id)) {
            where.roleId = id;
        }

        return this.RoleComponent.destroy({ where });
    }
}
