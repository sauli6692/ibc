import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { RoleComponent } from './roleComponent.model';

export class RoleComponentService extends BaseCustomService implements IService {
    private RoleComponent: any;
    private Role: any;
    private Component: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new RoleComponent(this.component, this.app);
        this.RoleComponent = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Role = this.app.getModel('Role');
        this.Component = this.app.getModel('Component');
    }

    protected define() {
        return {
            route: 'roles/:roleId/components',
            schemas: {
                create: {
                    type: 'object'
                },
                update: {
                    type: 'object'
                }
            }
        };
    }

    public find(params: any): Promise<any> {
        return this.Role.findAll({
            where: { id: params.roleId },
            include: [{
                model: this.Component,
                as: 'components'
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Role not found.');
            }
            return results[0].components;
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Role.findAll({
            where: { id: params.roleId },
            include: [{
                model: this.Component,
                as: 'components',
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
            }
            return results[0].components[0];
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.roleId = lodash.parseInt(params.roleId);

        return this.RoleComponent.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            roleId: params.roleId
        };

        if (!lodash.isNil(id)) {
            where.componentId = id;
        }

        return this.RoleComponent.destroy({ where });
    }
}
