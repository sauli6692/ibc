import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Visit } from './visit.model';

export class VisitService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'visits',
            model: Visit
        };
    }
}
