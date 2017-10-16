import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Harvest } from './harvest.model';

export class HarvestService extends BaseCRUDService {
    protected define() {
        return {
            name: 'harvests',
            model: Harvest
        };
    }
}
