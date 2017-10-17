import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Harvest } from './harvest.model';

export class HarvestService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'harvests',
            model: Harvest
        };
    }
}
