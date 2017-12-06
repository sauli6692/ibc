import { BaseSequelizeService } from '../../../core/domain/services';
import { Route } from './route.model';

export class RouteService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'routes',
            model: Route,
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
