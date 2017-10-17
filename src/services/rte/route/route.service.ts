import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Route } from './route.model';

export class RouteService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'routes',
            model: Route
        };
    }
}
