import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Route } from './route.model';

export class RouteService extends BaseCRUDService {
    protected define() {
        return {
            name: 'routes',
            model: Route
        };
    }
}
