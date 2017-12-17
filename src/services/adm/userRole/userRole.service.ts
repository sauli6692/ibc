import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { UserRole } from './userRole.model';
import { schemas } from './userRole.schema';

export class UserRoleService extends BaseCustomService implements IService {
    private UserRole: any;
    private User: any;
    private Role: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new UserRole(this.component, this.app);
        this.UserRole = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.User = this.app.getModel('adm', 'User');
        this.Role = this.app.getModel('adm', 'Role');
    }

    protected define() {
        return {
            route: 'users/:userId/roles',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.User.findAll({
            where: { id: params.userId },
            include: [{
                model: this.Role,
                as: 'roles'
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('User not found.');
            }
            return _.map(results[0].roles, (role: any) => {
                return {
                    id: role.id,
                    name: role.name,
                    description: role.description
                };
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.User.findAll({
            where: { id: params.userId },
            include: [{
                model: this.Role,
                as: 'roles',
                where: { id }
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
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
        data.userId = _.parseInt(params.userId);

        return this.UserRole.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            userId: params.userId
        };

        if (!_.isNil(id)) {
            where.componentId = id;
        }

        return this.UserRole.destroy({ where });
    }
}
