import { BaseSequelizeService } from '../../../core/domain/services';
import { Harvest } from './harvest.model';
import { hooks } from './harvest.hooks';
import { schemas } from './harvest.schema';

export class HarvestService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'harvests',
            model: Harvest,
            id: 'personId',
            hooks,
            schemas
        };
    }
}
