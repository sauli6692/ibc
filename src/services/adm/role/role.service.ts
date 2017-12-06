import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Role } from './role.model';

export class RoleService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'roles',
            model: Role,
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
}
