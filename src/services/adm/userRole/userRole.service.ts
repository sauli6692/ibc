import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { UserRole } from './userRole.model';

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
        this.User = this.app.getModel('User');
        this.Role = this.app.getModel('Role');
    }

    protected define() {
        return {
            route: 'users/:userId/roles',
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
        return this.User.findAll({
            where: { id: params.userId },
            include: [{
                model: this.Role,
                as: 'roles'
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('User not found.');
            }
            return results[0].roles;
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
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
            }
            return results[0].roles[0];
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.userId = lodash.parseInt(params.userId);

        return this.UserRole.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            userId: params.userId
        };

        if (!lodash.isNil(id)) {
            where.componentId = id;
        }

        return this.UserRole.destroy({ where });
    }
}
