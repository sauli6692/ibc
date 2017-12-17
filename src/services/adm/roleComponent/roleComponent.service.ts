import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { RoleComponent } from './roleComponent.model';
import { schemas } from './roleComponent.schema';

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
        this.Role = this.app.getModel('adm', 'Role');
        this.Component = this.app.getModel('adm', 'Component');
    }

    protected define() {
        return {
            route: 'roles/:roleId/components',
            schemas
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
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Role not found.');
            }
            return _.map(results[0].components, (component: any) => {
                return {
                    id: component.id,
                    name: component.name,
                    description: component.description
                };
            });
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
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
            }
            let component = results[0].components[0];

            return {
                id: component.id,
                name: component.name,
                description: component.description
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.roleId = _.parseInt(params.roleId);

        return this.RoleComponent.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            roleId: params.roleId
        };

        if (!_.isNil(id)) {
            where.componentId = id;
        }

        return this.RoleComponent.destroy({ where });
    }
}
