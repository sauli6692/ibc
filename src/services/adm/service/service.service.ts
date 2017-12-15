import { BaseSequelizeService } from '../../../core/domain/services';
import { Service } from './service.model';
import { schemas } from './service.schema';

export class ServiceService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'services',
            model: Service,
            schemas
        };
    }
}
