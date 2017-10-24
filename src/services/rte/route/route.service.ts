import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Route } from './route.model';

export class RouteService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'routes',
            model: Route
        };
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
