import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Visit } from './visit.model';

export class VisitService extends BaseCRUDService {
    protected define() {
        return {
            name: 'visits',
            model: Visit
        };
    }
}
