import { BaseSequelizeService } from '../../../core/domain/services';
import { Route } from './route.model';
import { schemas } from './route.schema';

export class RouteService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'routes',
            model: Route,
            schemas
        };
    }
}
